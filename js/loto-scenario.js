// Browser-compatible version of loto-scenario.js
// Remove ES module imports and use globally available React instead

const LOTODecisionScenario = () => {
  // Destructure React hooks from global React object
  const { useState } = React;
  
  // Get icons from lucide-react global object
  const { AlertCircle, CheckCircle2, Lock, Info, X, ArrowRight } = LucideReact;
  
  // Game state
  const [currentStep, setCurrentStep] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  // The LOTO scenario steps
  const steps = [
    {
      title: "Starting Your Maintenance Task",
      description: "You need to repair a malfunctioning conveyor belt motor. What's your first step?",
      emoji: "🏭",
      options: [
        { 
          id: "1a",
          text: "Start working on the machine immediately", 
          correct: false,
          explanation: "This is unsafe. Never start work without following LOTO procedures first. This could lead to serious injury if someone turns on the power."
        },
        { 
          id: "1b",
          text: "Notify other workers and get your LOTO kit", 
          correct: true,
          explanation: "Correct approach. Always notify affected employees and get proper LOTO equipment before starting work on powered equipment."
        }
      ]
    },
    {
      title: "Power Isolation",
      description: "You're at the power panel for the conveyor motor. What should you do?",
      emoji: "🔌",
      options: [
        { 
          id: "2a",
          text: "Turn off the power switch only", 
          correct: false,
          explanation: "Insufficient protection. Just turning off the power isn't enough since someone could turn it back on while you're working."
        },
        { 
          id: "2b",
          text: "Turn off the power, apply lockout device and your personal lock", 
          correct: true,
          explanation: "Correct procedure. After turning off power, you must physically secure it with a lockout device and your personal lock to prevent reactivation."
        }
      ]
    },
    {
      title: "Identification",
      description: "The power is now locked out. What's the next important step?",
      emoji: "🏷️",
      options: [
        { 
          id: "3a",
          text: "Start working right away since the power is locked out", 
          correct: false,
          explanation: "Missing key step. Without identification, others won't know who applied the lockout, why, or when it can be removed."
        },
        { 
          id: "3b",
          text: "Attach a tag with your name, date, and reason for lockout", 
          correct: true,
          explanation: "Correct procedure. Always attach a tag that identifies who performed the lockout, when it was applied, and why it's needed."
        }
      ]
    },
    {
      title: "Verification",
      description: "Before starting the repair work, what should you do?",
      emoji: "🔍",
      options: [
        { 
          id: "4a",
          text: "Start work since you've locked out the power", 
          correct: false,
          explanation: "Unsafe practice. You must verify the equipment is actually de-energized before starting work, as stored energy might remain."
        },
        { 
          id: "4b",
          text: "Verify zero energy state by attempting to start the machine", 
          correct: true,
          explanation: "Correct verification. Always test that the machine cannot be started before beginning work to confirm effective isolation."
        }
      ]
    },
    {
      title: "Completing the Work",
      description: "You've finished the repairs. What's the proper way to restore power?",
      emoji: "🔧",
      options: [
        { 
          id: "5a",
          text: "Have your supervisor remove the lock and restore power", 
          correct: false,
          explanation: "Violation of LOTO rules. Only the person who applied the lockout should remove it to ensure the worker who performed maintenance is safe."
        },
        { 
          id: "5b",
          text: "Remove your tag and lock, ensure the area is clear, then restore power", 
          correct: true,
          explanation: "Correct procedure. Only after ensuring the work area is safe and all tools are removed should you remove your own lock and tag."
        }
      ]
    }
  ];

  // Handle selecting an option
  const selectOption = (option) => {
    // Add this choice to user choices
    setUserChoices([...userChoices, option]);
    
    // Move to next step or show results if done
    if (currentStep === steps.length - 1) {
      setShowResults(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  // Calculate score
  const calculateScore = () => {
    const correctAnswers = userChoices.filter(choice => choice.correct).length;
    return {
      correct: correctAnswers,
      total: steps.length,
      percentage: Math.round((correctAnswers / steps.length) * 100)
    };
  };

  // Get score assessment
  const getScoreAssessment = (score) => {
    if (score.percentage === 100) return {
      title: "Perfect! You're a LOTO expert!",
      description: "You understand all the critical steps of lockout/tagout procedures. You prioritize safety and follow proper protocols.",
      emoji: "🏆",
      color: "text-green-700"
    };
    
    if (score.percentage >= 80) return {
      title: "Good job! Almost there.",
      description: "You have a strong understanding of LOTO procedures, but there's still room for improvement on some details.",
      emoji: "🥈",
      color: "text-blue-700"
    };
    
    if (score.percentage >= 60) return {
      title: "Needs improvement",
      description: "You know some LOTO basics, but missed important safety steps that could lead to workplace incidents.",
      emoji: "📋",
      color: "text-yellow-700"
    };
    
    return {
      title: "Safety review required",
      description: "Your understanding of LOTO procedures needs significant improvement. These protocols are essential for preventing serious workplace injuries.",
      emoji: "⚠️",
      color: "text-red-700"
    };
  };

  // Check if injury would have occurred
  const checkForInjury = () => {
    // Critical mistakes that would lead to injury
    const criticalMistakes = userChoices.some(choice => 
      choice.id === "1a" || choice.id === "2a" || choice.id === "4a"
    );
    
    return criticalMistakes;
  };

  // Reset the scenario
  const resetScenario = () => {
    setCurrentStep(0);
    setUserChoices([]);
    setShowResults(false);
  };

  // Current step data
  const currentStepData = steps[currentStep];
  const score = calculateScore();
  const assessment = getScoreAssessment(score);
  const injuryOccurred = checkForInjury();

  return React.createElement(
    'div',
    { className: "flex flex-col bg-gray-50 rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto" },
    
    // Header
    React.createElement(
      'div',
      { className: "bg-blue-600 text-white p-4" },
      React.createElement(
        'h1',
        { className: "text-xl font-bold text-center" },
        "Lockout/Tagout Safety Decision Scenario"
      )
    ),
    
    !showResults ? 
      // Current step
      React.createElement(
        'div',
        { className: "p-6" },
        
        // Title with emoji
        React.createElement(
          'div',
          { className: "flex items-center mb-4" },
          React.createElement('div', { className: "text-5xl mr-3" }, currentStepData.emoji),
          React.createElement('h2', { className: "text-xl font-bold text-blue-800" }, currentStepData.title)
        ),
        
        // Description
        React.createElement('p', { className: "mb-6 text-gray-700" }, currentStepData.description),
        
        // Options
        React.createElement(
          'div',
          { className: "space-y-3 mb-4" },
          currentStepData.options.map(option => 
            React.createElement(
              'button',
              { 
                key: option.id,
                onClick: () => selectOption(option),
                className: "w-full p-4 text-left rounded-md border border-gray-200 hover:bg-blue-50 transition-colors"
              },
              option.text
            )
          )
        ),
        
        // Progress bar
        React.createElement(
          'div',
          { className: "mt-6" },
          
          // Progress text
          React.createElement(
            'div',
            { className: "flex justify-between text-sm text-gray-500 mb-1" },
            React.createElement('span', {}, `Decision ${currentStep + 1} of ${steps.length}`),
            React.createElement('span', {}, `${Math.round((currentStep / steps.length) * 100)}% Complete`)
          ),
          
          // Progress bar
          React.createElement(
            'div',
            { className: "w-full bg-gray-200 rounded-full h-2.5" },
            React.createElement(
              'div',
              { 
                className: "bg-blue-600 h-2.5 rounded-full",
                style: { width: `${((currentStep) / steps.length) * 100}%` }
              }
            )
          )
        )
      )
    :
      // Results screen
      React.createElement(
        'div',
        { className: "p-6" },
        
        // Outcome section
        React.createElement(
          'div',
          { className: "mb-8 bg-white rounded-lg border p-4" },
          
          // Assessment title
          React.createElement(
            'h2',
            { className: "text-2xl font-bold mb-2 flex items-center" },
            React.createElement('span', { className: "text-4xl mr-3" }, assessment.emoji),
            React.createElement('span', { className: assessment.color }, assessment.title)
          ),
          
          // Assessment description
          React.createElement('p', { className: "mb-3" }, assessment.description),
          
          // Score indicators
          React.createElement(
            'div',
            { className: "flex items-center justify-center my-5" },
            
            // Correct decisions
            React.createElement(
              'div',
              { className: "text-center px-4" },
              React.createElement('div', { className: "text-3xl font-bold text-blue-700" }, score.correct),
              React.createElement('div', { className: "text-sm text-gray-500" }, "Correct Decisions")
            ),
            
            // Safety score
            React.createElement(
              'div',
              { className: "text-center px-4" },
              React.createElement('div', { className: "text-3xl font-bold text-green-700" }, `${score.percentage}%`),
              React.createElement('div', { className: "text-sm text-gray-500" }, "Safety Score")
            ),
            
            // Safety violations
            React.createElement(
              'div',
              { className: "text-center px-4" },
              React.createElement('div', { className: "text-3xl font-bold text-red-700" }, steps.length - score.correct),
              React.createElement('div', { className: "text-sm text-gray-500" }, "Safety Violations")
            )
          ),
          
          // Injury warning if applicable
          injuryOccurred && 
            React.createElement(
              'div',
              { className: "bg-red-50 border border-red-200 rounded-md p-3 text-red-800 flex items-start" },
              React.createElement(AlertCircle, { className: "h-5 w-5 mr-2 mt-0.5 flex-shrink-0" }),
              React.createElement(
                'div',
                {},
                React.createElement('span', { className: "font-bold" }, "Simulated Incident: "),
                "Your choices would have likely resulted in a workplace injury. One or more critical safety protocols were bypassed."
              )
            )
        ),
        
        // Your decisions review header
        React.createElement('h3', { className: "font-bold text-lg mb-3" }, "Your Decisions:"),
        
        // Decisions list
        React.createElement(
          'div',
          { className: "space-y-4 mb-8" },
          steps.map((step, index) => {
            const userChoice = userChoices[index];
            return React.createElement(
              'div',
              { key: index, className: "bg-white rounded-md border overflow-hidden" },
              
              // Step header
              React.createElement(
                'div',
                { className: "flex items-center p-3 border-b bg-gray-50" },
                React.createElement('span', { className: "text-lg mr-2" }, step.emoji),
                React.createElement('span', { className: "font-medium" }, step.title)
              ),
              
              // Step content
              React.createElement(
                'div',
                { className: "p-3" },
                
                // User choice
                React.createElement(
                  'div',
                  { className: `flex items-start rounded-md p-2 ${userChoice.correct ? 'bg-green-50' : 'bg-red-50'}` },
                  userChoice.correct ? 
                    React.createElement(CheckCircle2, { className: "h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" }) : 
                    React.createElement(X, { className: "h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" }),
                  React.createElement(
                    'div',
                    {},
                    React.createElement('div', { className: "font-medium" }, `Your choice: ${userChoice.text}`),
                    React.createElement('div', { className: "text-sm mt-1" }, userChoice.explanation)
                  )
                ),
                
                // Correct choice (if user was wrong)
                !userChoice.correct && 
                  React.createElement(
                    'div',
                    { className: "flex items-start rounded-md p-2 bg-green-50 mt-2" },
                    React.createElement(CheckCircle2, { className: "h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" }),
                    React.createElement(
                      'div',
                      {},
                      React.createElement(
                        'div', 
                        { className: "font-medium" }, 
                        `Correct approach: ${step.options.find(opt => opt.correct).text}`
                      )
                    )
                  )
              )
            );
          })
        ),
        
        // LOTO steps reminder
        React.createElement(
          'div',
          { className: "bg-blue-50 rounded-md border border-blue-200 p-4 mb-6" },
          
          // Reminder header
          React.createElement(
            'h3',
            { className: "font-bold text-lg mb-3 flex items-center text-blue-800" },
            React.createElement(Info, { className: "mr-2 h-5 w-5" }),
            "Key LOTO Steps to Remember:"
          ),
          
          // Steps list
          React.createElement(
            'ol',
            { className: "list-decimal pl-5 space-y-1 text-blue-900" },
            [
              "Notify affected employees before shutdown",
              "Turn off the machine or equipment",
              "Isolate the energy source(s)",
              "Apply lockout devices and personal lock",
              "Attach identification tags with name and date",
              "Verify zero energy state before beginning work",
              "Complete work and inspect the area",
              "Remove lockout/tagout devices (only by the person who applied them)",
              "Notify employees and restore power"
            ].map((step, index) => 
              React.createElement('li', { key: index }, step)
            )
          )
        ),
        
        // Restart button
        React.createElement(
          'div',
          { className: "text-center" },
          React.createElement(
            'button',
            {
              onClick: resetScenario,
              className: "px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium flex items-center mx-auto"
            },
            React.createElement(ArrowRight, { className: "mr-2 h-5 w-5" }),
            "Try Again"
          )
        )
      ),
    
    // Footer
    React.createElement(
      'div',
      { className: "bg-gray-200 p-3 text-center text-gray-600 text-sm" },
      React.createElement(
        'div',
        { className: "flex items-center justify-center" },
        React.createElement(Lock, { className: "mr-2 h-4 w-4" }),
        "Always follow proper LOTO procedures in real-world situations"
      )
    )
  );
};

// No export needed - this will be available as a global variable