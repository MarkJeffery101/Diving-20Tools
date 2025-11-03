#!/usr/bin/env python3
import re

# Read the file
with open('client/pages/TableUse.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and extract the info cards section (lines 505-526)
# We'll use a regex to match the entire info cards grid section
pattern = r'          \{\s*/\*\s*Info Cards Grid\s*\*/\s*\}\s*\n          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">.*?</div>\s*\n'
match = re.search(pattern, content, re.DOTALL)

if match:
    info_cards_section = match.group(0)
    print("Found info cards section")
    # Remove it from content
    content_without_cards = content[:match.start()] + content[match.end():]
    
    # Now we need to add it back at the bottom, before the closing divs
    # Find the position before the final closing divs
    # Look for the critical warning section and insert before the closing divs after it
    closing_pattern = r'              </div>\s*\n            </div>\s*\n          </div>\s*\n        </div>\s*\n      </div>'
    closing_match = re.search(closing_pattern, content_without_cards)
    
    if closing_match:
        insert_position = closing_match.start()
        
        # Build the new content with info cards at bottom
        new_content = (
            content_without_cards[:insert_position] + 
            '\n\n          {/* Info Cards Grid */}\n' +
            '          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">\n' +
            '            {infoCards.map((card) => (\n' +
            '              <Card key={card.id} className={`${card.color} border-2`}>\n' +
            '                <CardHeader className="pb-3">\n' +
            '                  <div className="flex items-start gap-3">\n' +
            '                    <div className="text-xl">{card.icon}</div>\n' +
            '                    <CardTitle className="text-sm">{card.title}</CardTitle>\n' +
            '                  </div>\n' +
            '                </CardHeader>\n' +
            '                <CardContent>\n' +
            '                  <ul className="space-y-1.5">\n' +
            '                    {card.points.map((point, idx) => (\n' +
            '                      <li key={idx} className="text-xs text-gray-700">\n' +
            '                        ● {point}\n' +
            '                      </li>\n' +
            '                    ))}\n' +
            '                  </ul>\n' +
            '                </CardContent>\n' +
            '              </Card>\n' +
            '            ))}\n' +
            '          </div>' +
            content_without_cards[insert_position:]
        )
        
        # Write the new content back
        with open('client/pages/TableUse.tsx', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully moved info cards to bottom!")
    else:
        print("Could not find closing divs pattern")
else:
    print("Could not find info cards section")
