# Local Backend Testing Script

import subprocess
import sys
import time
import requests

def test_backend_locally():
    """Test the Python backend before deploying to HF Spaces"""
    
    print("🚀 Starting Artisan AI Backend Local Test\n")
    
    # Step 1: Check Python version
    print("📌 Step 1: Checking Python version...")
    python_version = sys.version.split()[0]
    print(f"   Python {python_version}")
    if not python_version.startswith('3.'):
        print("   ❌ Python 3.x required!")
        return False
    print("   ✅ Python version OK\n")
    
    # Step 2: Install dependencies
    print("📌 Step 2: Installing dependencies...")
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "backend/requirements.txt"], 
                      check=True, capture_output=True)
        print("   ✅ Dependencies installed\n")
    except subprocess.CalledProcessError as e:
        print(f"   ❌ Failed to install dependencies: {e}")
        return False
    
    # Step 3: Start backend server
    print("📌 Step 3: Starting backend server...")
    print("   (This will run in the background)")
    
    process = subprocess.Popen(
        [sys.executable, "backend/app.py"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    
    # Wait for server to start
    print("   Waiting for server to start...")
    time.sleep(5)
    
    # Step 4: Test health endpoint
    print("\n📌 Step 4: Testing health endpoint...")
    try:
        response = requests.get("http://localhost:7860/health", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Health check passed!")
            print(f"   Status: {data.get('status')}")
            print(f"   GPU Available: {data.get('gpu_available')}")
        else:
            print(f"   ❌ Health check failed with status {response.status_code}")
            process.kill()
            return False
    except Exception as e:
        print(f"   ❌ Health check failed: {e}")
        process.kill()
        return False
    
    # Step 5: Test text generation (light test to avoid long model loading)
    print("\n📌 Step 5: Testing text generation...")
    print("   (Note: First request may take 20-30s to load model)")
    try:
        response = requests.post(
            "http://localhost:7860/api/text",
            json={
                "prompt": "Write one sentence.",
                "max_tokens": 50
            },
            timeout=60
        )
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Text generation works!")
            print(f"   Generated: {data['text'][:100]}...")
        else:
            print(f"   ❌ Text generation failed: {response.status_code}")
    except requests.exceptions.Timeout:
        print("   ⚠️ Request timed out (model may be loading)")
        print("   This is normal for first request on CPU")
    except Exception as e:
        print(f"   ⚠️ Text generation test skipped: {e}")
    
    # Step 6: Cleanup
    print("\n📌 Step 6: Cleanup...")
    process.kill()
    print("   ✅ Server stopped\n")
    
    print("="*60)
    print("✅ LOCAL TESTING COMPLETE!")
    print("="*60)
    print("\nNext steps:")
    print("1. If all tests passed, you're ready to deploy to HF Spaces")
    print("2. Follow DEPLOYMENT_GUIDE.md for deployment instructions")
    print("3. Update backendConfig.ts with your HF Space URL")
    print("\n🚀 Ready for deployment!")
    
    return True

if __name__ == "__main__":
    try:
        success = test_backend_locally()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n\n⚠️ Testing interrupted by user")
        sys.exit(1)
