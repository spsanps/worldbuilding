import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, MapPin, Heart, Shield, Sword, Book } from 'lucide-react';

const WorldBuilderCard = ({ data }) => {
  const [currentIndex, setNextIndex] = useState(0);
  const currentItem = data[currentIndex];

  const nextCard = () => setNextIndex((prevIndex) => (prevIndex + 1) % data.length);
  const prevCard = () => setNextIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);

  const renderAttributes = (attributes) => (
    <div className="grid grid-cols-2 gap-2">
      {Object.entries(attributes).map(([key, value]) => (
        <div key={key} className="flex items-center">
          {key === 'health' && <Heart className="w-5 h-5 text-red-500 mr-1" />}
          {key === 'defense' && <Shield className="w-5 h-5 text-gray-500 mr-1" />}
          {key === 'attack' && <Sword className="w-5 h-5 text-orange-500 mr-1" />}
          {key === 'magic' && <Book className="w-5 h-5 text-blue-500 mr-1" />}
          <span className="text-sm capitalize">{key}: {value}</span>
        </div>
      ))}
    </div>
  );

  const renderSection = (section) => (
    <div key={section.title} className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
      {section.type === 'list' && (
        <ul className="list-disc list-inside text-sm">
          {section.content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      {section.type === 'text' && (
        <p className="text-sm text-gray-700">{section.content}</p>
      )}
      {section.type === 'keyValue' && (
        <ul className="space-y-1">
          {section.content.map((item, index) => (
            <li key={index} className="text-sm">
              <span className="font-semibold">{item.key}:</span> {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative w-full max-w-3xl">
        <button onClick={prevCard} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={nextCard} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10">
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="bg-white rounded-lg shadow-lg p-6 m-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {currentItem.type === 'character' ? (
                <User className="w-8 h-8 mr-2 text-blue-500" />
              ) : (
                <MapPin className="w-8 h-8 mr-2 text-green-500" />
              )}
              <h2 className="text-2xl font-bold">{currentItem.name}</h2>
            </div>
            <span className="text-sm font-semibold text-gray-500">{currentItem.type.charAt(0).toUpperCase() + currentItem.type.slice(1)}</span>
          </div>
          <p className="text-md text-gray-600 mb-4">{currentItem.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <ul className="space-y-1">
                {currentItem.details.map((detail, index) => (
                  <li key={index} className="text-sm">
                    <span className="font-semibold">{detail.label}:</span> {detail.value}
                  </li>
                ))}
              </ul>
            </div>
            {currentItem.attributes && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Attributes</h3>
                {renderAttributes(currentItem.attributes)}
              </div>
            )}
          </div>
          
          {currentItem.sections && currentItem.sections.map(renderSection)}
          
          {currentItem.references && currentItem.references.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">References</h3>
              <ul className="list-disc list-inside text-sm text-blue-500">
                {currentItem.references.map((ref, index) => (
                  <li key={index}>
                    <a href={`#${ref}`} className="hover:underline">{ref}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const sampleData = [
  {
    type: 'character',
    name: 'Elara Moonwhisper',
    description: 'An enigmatic elven mage with silver hair and piercing violet eyes, known for her mastery over arcane illusions and time magic.',
    details: [
      { label: 'Race', value: 'High Elf' },
      { label: 'Class', value: 'Chronomancer' },
      { label: 'Age', value: '342' },
      { label: 'Homeland', value: 'Silvergrove Forest' },
    ],
    attributes: {
      health: 65,
      defense: 40,
      attack: 30,
      magic: 95,
    },
    sections: [
      {
        title: 'Abilities',
        type: 'list',
        content: [
          'Time Manipulation',
          'Illusion Weaving',
          'Arcane Lore',
          'Telepathy',
          'Elven Diplomacy'
        ]
      },
      {
        title: 'Notable Possessions',
        type: 'list',
        content: [
          'Staff of Temporal Flux',
          'Moonstone Amulet',
          'Robe of the Astral Winds',
          'Spellbook of Chronos'
        ]
      },
      {
        title: 'Backstory',
        type: 'text',
        content: "Born during a rare celestial alignment, Elara showed an innate talent for time and illusion magic from a young age. She left her secluded elven community to study at the Ancient Arcane Academy, where she quickly became one of its most promising students. Her research into the nature of time itself has led her to uncover ancient secrets and powerful artifacts, drawing the attention of both allies and adversaries across the realms."
      },
      {
        title: 'Key Relationships',
        type: 'keyValue',
        content: [
          { key: 'Arch-Mage Sylas', value: 'Mentor and confidant at the Ancient Arcane Academy' },
          { key: 'Thorne Shadowblade', value: 'Rival turned reluctant ally, a rogue chronomancer' },
          { key: 'Queen Ariadne', value: 'Elven monarch who seeks Elara\'s counsel on matters of time magic' }
        ]
      }
    ],
    references: ['Silvergrove Forest', 'Ancient Arcane Academy', 'Temporal Nexus', 'Chronomancer\'s Guild']
  },
  {
    type: 'location',
    name: 'Silvergrove Forest',
    description: 'An ancient, mystical forest with trees that shimmer like silver in the moonlight, home to the reclusive high elves and nexus of natural magic.',
    details: [
      { label: 'Climate', value: 'Temperate, magically regulated' },
      { label: 'Size', value: 'Approximately 10,000 square miles' },
      { label: 'Inhabitants', value: 'High Elves, Fae creatures, Magical beasts' },
      { label: 'Known for', value: 'Magical properties, Ancient elven architecture, Time anomalies' },
    ],
    sections: [
      {
        title: 'Notable Landmarks',
        type: 'list',
        content: [
          'The Whispering Willows - Ancient trees said to hold the memories of past elven generations',
          'Moonlit Glade - A clearing where magical rituals are performed under the full moon',
          'Crystal Caves - A network of underground caverns filled with luminescent crystals',
          'Temporal Pools - Mysterious bodies of water where time flows differently',
          'Elvenholm - The hidden capital city of the High Elves'
        ]
      },
      {
        title: 'History',
        type: 'text',
        content: "Silvergrove Forest has stood for millennia, its magic intertwined with the essence of the elven race. Legend says the first elves awakened here, blessed by the light of the moon filtered through the silver leaves. The forest's connection to the fabric of time and space has made it a focal point for magical study and a natural sanctuary for creatures of magic."
      },
      {
        title: 'Magical Properties',
        type: 'keyValue',
        content: [
          { key: 'Time Distortion', value: 'Certain areas experience time differently than the outside world' },
          { key: 'Natural Mana Wells', value: 'Pools of pure magical energy that replenish over time' },
          { key: 'Fae Crossings', value: 'Portals to the Fae Realm that open under specific conditions' }
        ]
      }
    ],
    references: ['Elara Moonwhisper', 'High Elven Council', 'Fae Realm Portal', 'Temporal Nexus']
  },
];

const App = () => (
  <WorldBuilderCard data={sampleData} />
);

export default App;