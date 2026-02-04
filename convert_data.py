import json
import random
import re

def convert_data():
    try:
        # Read the JS file text
        with open('localization.js', 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Extract the JSON object content
        # We look for the start of the object and the matching closing brace.
        # Since it's a simple structure, we can look for the LAST '}' that matches the indentation or structure.
        # Or better, just find the last occurrence of '}' before the module exports or end of file.
        
        start_idx = content.find('{')
        if start_idx == -1:
             raise ValueError("Could not find start of JSON object")
             
        # Find the last '}' in the file, ensuring we ignore the one in the module export code if present.
        # But wait, my module export code also has braces. 
        # The data object ends with `] }`.
        # Let's look for the last occurrence of `] }` which signifies the end of the sheet1 array and the object.
        # Or simply find the last '}' before "module.exports"
        
        export_idx = content.find('module.exports')
        if export_idx != -1:
            # Search backwards from export_idx
            end_idx = content.rfind('}', 0, export_idx)
        else:
            end_idx = content.rfind('}')
            
        if end_idx == -1:
             raise ValueError("Could not find end of JSON object")
             
        json_str = content[start_idx : end_idx+1]
        
        # Verify it looks like valid JSON end
        if not json_str.strip().endswith('}'):
             # fallback, maybe there are spaces
             pass

        raw_data = json.loads(json_str)
        
        # Access the 'sheet1' array
        source_records = raw_data.get('sheet1', [])
        
        businesses = []
        for index, record in enumerate(source_records, 1):
            
            # Helper to safely get string
            def get_val(key, default=""):
                val = record.get(key)
                return str(val).strip() if val else default

            name = get_val("Name", "Unknown Store")
            category = get_val("Category", "Book Store")
            
            # Generate a rating between 3.5 and 5.0 for visuals
            rating = round(random.uniform(3.5, 5.0), 1)
            
            # Hours
            hours = get_val("Open Hours", "10:00 AM - 9:00 PM")
            
            # Phone
            phone = get_val("Phone", "Contact Unavailable")
            
            # Description
            desc = f"Premier {category} destination in Akola. {name} offers a wide selection of books and stationery to cater to all your educational and recreational reading needs."

            business = {
                "id": index,
                "name": name,
                "address": get_val("Address", "Akola, Maharashtra"),
                "phone": phone,
                "rating": rating,
                "category": category,
                "website": get_val("Website", "#"),
                "hours": hours,
                "description": desc,
                "latitude": get_val("Latitude"),
                "longitude": get_val("Longitude"),
                "mapUrl": get_val("Bing Maps URL")
            }
            businesses.append(business)
            
        # Output as JS variable
        js_content = f"// Converted from localization.js\nconst businesses = {json.dumps(businesses, indent=2)};\n\n// Export for use in other scripts\nif (typeof module !== 'undefined' && module.exports) {{\n  module.exports = {{ businesses }};\n}}\n"
        
        with open('data.js', 'w', encoding='utf-8') as f:
            f.write(js_content)
            
        print(f"Successfully converted {len(businesses)} records to data.js")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    convert_data()
