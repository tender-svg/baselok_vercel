import urllib.request
from html.parser import HTMLParser
import re
import json

url = "https://baselok.com/resources/videos/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    links = list(set(re.findall(r'https://www\.youtube\.com/embed/([^\x22\x27\?]+)', html)))
    
    videos = []
    
    # Try to extract the title from the container nearby
    for video_id in links:
        idx = html.find(video_id)
        title = "Baselok Video"
        if idx != -1:
            snippet = html[max(0, idx-500):idx+500]
            # Try to find a nearby h6 or h5
            m = re.search(r'<h[1-6][^>]*>([^<]+)</h[1-6]>', snippet, re.IGNORECASE)
            if m:
                title = m.group(1).strip()
            
        videos.append({
            'video_id': video_id,
            'url': f'https://www.youtube.com/embed/{video_id}',
            'title': title
        })

    with open('vids.json', 'w', encoding='utf-8') as f:
        json.dump(videos, f, indent=2)

except Exception as e:
    print("Error:", e)
