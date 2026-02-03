import requests
import json
import time

BASE_URL = "http://localhost:7860"

def test_endpoint(name, endpoint, payload):
    print(f"--- Testing {name} ({endpoint}) ---")
    try:
        start_time = time.time()
        response = requests.post(f"{BASE_URL}{endpoint}", json=payload, timeout=10)
        duration = time.time() - start_time
        
        if response.status_code == 200:
            print(f"✅ Success ({duration:.2f}s)")
            # print(json.dumps(response.json(), indent=2)[:200] + "...")
            return True, duration
        else:
            print(f"❌ Failed: HTTP {response.status_code}")
            return False, duration
    except Exception as e:
        print(f"❌ Error: {e}")
        return False, 0

def run_suite():
    agents = [
        ("Niche Radar v2.0", "/api/niche-analysis", {"niche": "Cozy Mystery Books", "platforms": ["amazon"]}),
        ("Amazon SEO Engine", "/api/amazon-seo", {"topic": "Mindfulness Journal", "genre": "Self-Help"}),
        ("Brand Intelligence", "/api/brand-intel", {"brand": "Artisan AI", "niche": "Publishing Automation"}),
        ("Trend Intelligence", "/api/trend-analysis", {"query": "2026 Publishing Trends"}),
        ("KDP Book Lab", "/api/kdp-generate", {"genre": "Fiction", "topic": "Space Adventure"}),
        ("Coloring Pages Generator", "/api/coloring-generate", {"theme": "Animals", "pages": 5}),
        ("POD Merch Designer", "/api/pod-generate", {"product": "T-Shirt", "style": "Vintage"}),
        ("Cover Generator", "/api/cover-generate", {"genre": "Mystery", "title": "The Last Clue"}),
        ("Manuscript Expander", "/api/expand-chapter", {"chapter_outline": "The Discovery", "target_words": 100}),
        ("A+ Content Architect", "/api/aplus-generate", {"book_description": "Thrilling mystery"}),
        ("Visual Plate Generator", "/api/visual-plate", {"chapter_summary": "Detective finds letter"}),
        ("Profit Estimator", "/api/profit-estimate", {"price": 9.99, "pages": 200}),
        ("Compliance Validator", "/api/validate-kdp", {"file_path": "test.pdf"}),
        ("Export Orchestrator", "/api/export", {"format": "PDF"}),
        ("Cloud Save Manager", "/api/cloud-save", {"action": "save", "project_id": "test"}),
        ("Humanity Pro (AI Sanitizer)", "/api/humanize", {"text": "The protagonist delved into the tapestry."}),
    ]
    
    results = []
    print("🎬 Starting System-Wide Agent Verification\n")
    
    for name, endpoint, payload in agents:
        success, duration = test_endpoint(name, endpoint, payload)
        results.append((name, success, duration))
        
    print("\n" + "="*40)
    print("📊 VERIFICATION REPORT")
    print("="*40)
    for name, success, duration in results:
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{name:<30} {status} ({duration:.2f}s)")
    print("="*40)

if __name__ == "__main__":
    run_suite()
