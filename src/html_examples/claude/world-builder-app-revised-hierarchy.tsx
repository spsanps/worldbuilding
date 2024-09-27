import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, MapPin, Heart, Shield, Sword, Book, PenTool, Globe, ChevronDown, ChevronUp } from 'lucide-react';

const WorldBuilderCard = ({ data }) => {
  const [currentIndex, setNextIndex] = useState(0);
  const currentItem = data[currentIndex];

  const nextCard = () => setNextIndex((prevIndex) => (prevIndex + 1) % data.length);
  const prevCard = () => setNextIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);

  return (
    <div className="relative w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <button onClick={prevCard} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={nextCard} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10">
        <ChevronRight className="w-6 h-6" />
      </button>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {currentItem.type === 'character' ? (
            <User className="w-6 h-6 mr-2 text-blue-500" />
          ) : (
            <MapPin className="w-6 h-6 mr-2 text-green-500" />
          )}
          <h2 className="text-xl font-bold">{currentItem.name}</h2>
        </div>
        <span className="text-sm font-semibold text-gray-500">{currentItem.type}</span>
      </div>
      <p className="text-sm text-gray-600 mb-4">{currentItem.description}</p>
      <div className="text-sm">
        <strong>Key Details:</strong> {currentItem.keyDetails}
      </div>
    </div>
  );
};

const Navigation = ({ currentPage, setCurrentPage }) => (
  <nav className="bg-gray-800 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-xl font-bold">World Builder</h1>
      <div className="space-x-4">
        <button
          className={`px-3 py-2 rounded ${currentPage === 'plot' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
          onClick={() => setCurrentPage('plot')}
        >
          <PenTool className="inline-block mr-2" />
          Plot
        </button>
        <button
          className={`px-3 py-2 rounded ${currentPage === 'world' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
          onClick={() => setCurrentPage('world')}
        >
          <Globe className="inline-block mr-2" />
          World
        </button>
      </div>
    </div>
  </nav>
);

const TextInput = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const PlotSection = ({ title, content, onEdit, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {children && (
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-500 hover:text-gray-700">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        )}
      </div>
      <p className="text-sm mb-2">{content}</p>
      <button onClick={onEdit} className="text-blue-500 hover:text-blue-700">Edit</button>
      {isExpanded && children && (
        <div className="mt-4 ml-4 border-l-2 border-gray-200 pl-4">
          {children}
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('world');
  const [worldData, setWorldData] = useState([
    {
      type: 'character',
      name: 'Elara Moonwhisper',
      description: 'An enigmatic elven mage with mastery over time magic.',
      keyDetails: 'High Elf, Chronomancer, 342 years old'
    },
    {
      type: 'location',
      name: 'Silvergrove Forest',
      description: 'Ancient forest with trees that shimmer like silver, home to high elves.',
      keyDetails: 'Magical properties, Time anomalies, 10,000 sq miles'
    },
  ]);

  const [plotData, setPlotData] = useState({
    overall: "A young mage discovers an ancient artifact that threatens the fabric of time.",
    chapters: [
      {
        title: "The Discovery",
        content: "Elara finds a mysterious timepiece in the depths of Silvergrove Forest.",
        sections: [
          "Elara's routine patrol takes an unexpected turn.",
          "The timepiece begins to exhibit strange properties.",
          "Elara decides to seek wisdom from the Elders."
        ]
      },
      {
        title: "Unraveling the Mystery",
        content: "Elara researches the artifact's origins and its connection to time magic.",
        sections: [
          "Ancient texts reveal partial truths about the artifact.",
          "A rival mage learns of Elara's discovery.",
          "The timepiece's power grows, causing temporal disturbances."
        ]
      },
      {
        title: "Race Against Time",
        content: "Elara must master the artifact's power before it falls into the wrong hands.",
        sections: [
          "Elara begins training to control the timepiece.",
          "The rival mage launches an attack on Silvergrove.",
          "A climactic battle where past, present, and future collide."
        ]
      }
    ]
  });

  const handleTextSubmit = (input) => {
    console.log("Submitted:", input);
  };

  const handleEditPlot = (section) => {
    console.log("Editing plot section:", section);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="container mx-auto p-4">
        {currentPage === 'world' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">World Building</h2>
            <WorldBuilderCard data={worldData} />
          </div>
        )}
        {currentPage === 'plot' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Plot Development</h2>
            <PlotSection 
              title="Overall Plot" 
              content={plotData.overall}
              onEdit={() => handleEditPlot('overall')}
            />
            {plotData.chapters.map((chapter, chapterIndex) => (
              <PlotSection 
                key={chapterIndex}
                title={`Chapter ${chapterIndex + 1}: ${chapter.title}`}
                content={chapter.content}
                onEdit={() => handleEditPlot(`chapter_${chapterIndex}`)}
              >
                {chapter.sections.map((section, sectionIndex) => (
                  <PlotSection 
                    key={sectionIndex}
                    title={`Section ${sectionIndex + 1}`}
                    content={section}
                    onEdit={() => handleEditPlot(`chapter_${chapterIndex}_section_${sectionIndex}`)}
                  />
                ))}
              </PlotSection>
            ))}
          </div>
        )}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Interact with your World</h3>
          <TextInput onSubmit={handleTextSubmit} />
        </div>
      </div>
    </div>
  );
};

export default App;
