import React, { useState } from 'react';
import { HiOutlineClipboardCopy, HiOutlineTrash } from 'react-icons/hi';
import Checkbox from './Checkbox';

function Form({ leftLabels, rightLabels , subleftLabels ,subrightLabels }) {
  const [questions, setQuestions] = useState([{ id: 1, text: '', isChecked: false, type: 'checkbox', subQuestions: [] }]);


  const addQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([...questions, { id: newId, text: '', isChecked: false, type: 'checkbox', subQuestions: [] }]);
  };

  const addSubQuestion = (parentId) => {
    const parentQuestionIndex = questions.findIndex((question) => question.id === parentId);
    if (parentQuestionIndex !== -1) {
      const parentQuestion = questions[parentQuestionIndex];
      const newSubQuestionId = parentQuestion.subQuestions.length + 1;
      const updatedQuestions = [...questions];
      updatedQuestions[parentQuestionIndex] = {
        ...parentQuestion,
        subQuestions: [
          ...parentQuestion.subQuestions,
          { id: newSubQuestionId, text: '', isChecked: false, type: 'checkbox' }
        ]
      };
      setQuestions(updatedQuestions);
    }
  };

  const handleCopy = (questionId) => {
    const copiedQuestion = questions.find((question) => question.id === questionId);
    if (copiedQuestion) {
      setQuestions([...questions, { ...copiedQuestion, id: questions.length + 1 }]);
    }
  };

  const handleDelete = (questionId, subQuestionId = null) => {
    if (subQuestionId === null) {
      setQuestions(questions.filter((question) => question.id !== questionId));
    } else {
      const updatedQuestions = questions.map((question) => {
        if (question.id === questionId) {
          const updatedSubQuestions = question.subQuestions.filter((subQuestion) => subQuestion.id !== subQuestionId);
          return { ...question, subQuestions: updatedSubQuestions };
        }
        return question;
      });
      setQuestions(updatedQuestions);
    }
  };

  const handleInputChange = (e, questionId, subQuestionId = null) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        if (subQuestionId !== null) {
          const updatedSubQuestions = question.subQuestions.map((subQuestion) =>
            subQuestion.id === subQuestionId ? { ...subQuestion, text: e.target.value } : subQuestion
          );
          return { ...question, subQuestions: updatedSubQuestions };
        } else {
          return { ...question, text: e.target.value };
        }
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleCheckboxChange = (questionId, subQuestionId = null) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        if (subQuestionId !== null) {
          const updatedSubQuestions = question.subQuestions.map((subQuestion) =>
            subQuestion.id === subQuestionId ? { ...subQuestion, isChecked: !subQuestion.isChecked } : subQuestion
          );
          return { ...question, subQuestions: updatedSubQuestions };
        } else {
          return { ...question, isChecked: !question.isChecked };
        }
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleTypeChange = (e, questionId, subQuestionId = null) => {
    const selectedType = e.target.value;
    let additionalOptions = [];

    if (selectedType === "radio" || selectedType === "checkbox") {
      additionalOptions = ["Pass", "Fail", "Flag"];
    } else if (selectedType === "text") {
      additionalOptions = ["Option1", "Option2", "Option3"];
    }

    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        if (subQuestionId !== null) {
          const updatedSubQuestions = question.subQuestions.map((subQuestion) =>
            subQuestion.id === subQuestionId ? { ...subQuestion, type: selectedType } : subQuestion
          );
          return { ...question, subQuestions: updatedSubQuestions };
        } else {
          return { ...question, type: selectedType, additionalOptions: additionalOptions };
        }
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div style={{ backgroundColor: '#E2EEE0', padding: '10px', borderRadius: '10px', width: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#EAB308', height: '3rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 10px' }}>
        <h2 className="font-bold text-2xl mb-4 underline">Checklist</h2>
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '20px', width: '100%' }}>
        {questions.map((question, index) => (
          <div key={question.id} className="mb-4 bg-[#01A8F4] p-4">
            <label htmlFor={`question${question.id}`}>Question {question.id}:</label>
            <div className="flex items-center">
              <input
                type="text"
                id={`question${question.id}`}
                value={question.text}
                onChange={(e) => handleInputChange(e, question.id)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button onClick={() => handleCopy(question.id)} className="ml-2">
                <HiOutlineClipboardCopy className="w-6 h-6 inline-block" />
              </button>
              <button onClick={() => handleDelete(question.id)} className="ml-2">
                <HiOutlineTrash className="w-6 h-6 inline-block" />
              </button>
            </div>
    
            <div className="mt-2">
              <label htmlFor={`type${question.id}`}>Select Type:</label>
              <select
                id={`type${question.id}`}
                value={question.type}
                onChange={(e) => handleTypeChange(e, question.id)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1"
              >
                <option value="/">Choose</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio</option>
                <option value="text">Text</option>
              </select>
            </div>
            
            <div class="flex justify-between">
              <div class="flex flex-col">
                {question.additionalOptions && question.additionalOptions.map((option, idx) => (
                  <div key={idx} className="mb-4 px-20">
                    <input
                      type={question.type === 'radio' ? 'radio' : 'checkbox'}
                      id={`option${idx}-${question.id}`}
                      name={`option${idx}-${question.id}`}
                    />
                    <label htmlFor={`option${idx}-${question.id}`} className="ml-2">{option}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative left-[80px] pt-4">
            <div className="flex flex-col">
            {leftLabels.map((label, index) => (
             <Checkbox key={index} label={label} />
        ))}
           </div>
         <div className="flex flex-col relative left-[60px]">
          {rightLabels.map((label, index) => (
          <Checkbox key={index} label={label} />
        ))}
      </div>
    </div>   
            
            {question.subQuestions.map((subQuestion) => (
              <div key={subQuestion.id} className="ml-6 mt-2">
                <label htmlFor={`subquestion${subQuestion.id}`}>Subquestion {subQuestion.id}:</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    id={`subquestion${subQuestion.id}`}
                    value={subQuestion.text}
                    onChange={(e) => handleInputChange(e, question.id, subQuestion.id)}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button onClick={() => handleCopy(subQuestion.id)} className="ml-2">
                    <HiOutlineClipboardCopy className="w-6 h-6 inline-block" />
                  </button>
                  <button onClick={() => handleDelete(question.id, subQuestion.id)} className="ml-2">
                    <HiOutlineTrash className="w-6 h-6 inline-block" />
                  </button>
                </div>
    
                <div className="mt-2">
                  <label htmlFor={`type${subQuestion.id}`}>Select Type:</label>
                  <select
                    id={`type${subQuestion.id}`}
                    value={subQuestion.type}
                    onChange={(e) => handleTypeChange(e, question.id, subQuestion.id)}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1"
                  >
                    <option value="/">Choose</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                    <option value="text">Text</option>
                  </select>
                </div>
                
                
                <div class="flex justify-between">
                    
                  <div class="flex flex-col">
                    {question.additionalOptions && question.additionalOptions.map((option, idx) => (
                      <div key={idx} className="mb-4 px-20">
                        <input
                          type={question.type === 'radio' ? 'radio' : 'checkbox'}
                          id={`sub-option${idx}-${subQuestion.id}`}
                          name={`sub-option${idx}-${subQuestion.id}`}
                        />
                        <label htmlFor={`sub-option${idx}-${subQuestion.id}`} className="ml-2">{option}</label>
                      </div>
                    ))}

                  </div>
                  
                </div>
                
            <div className="grid grid-cols-2 gap-4 relative left-[80px] pt-4">
            <div className="flex flex-col">
            {leftLabels.map((label, index) => (
             <Checkbox key={index} label={label} />
        ))}
           </div>
         <div className="flex flex-col relative left-[60px] ">
          {rightLabels.map((label, index) => (
          <Checkbox key={index} label={label} />
        ))}
      </div>
    </div> 
              </div>
              
            ))}
            
            {index === questions.length - 1 && (
              <div>
                <button onClick={() => addSubQuestion(question.id)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2 mr-2">
                  Add Subquestion
                </button>
                <button onClick={addQuestion} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2">
                  Add Question
                </button>
              </div>
            )}
          </div>
        ))}

        
        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
