import { useState } from 'react';
import axios from 'axios';

function AddQuizForm() {
    const [formData, setFormData] = useState({
        lesson_id: '',
        question: '',
        correct_answer: '',
        choices: ['', '', '', ''], // Initialize 4 choices
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle choices input
    const handleChoiceChange = (index, value) => {
        const updatedChoices = [...formData.choices];
        updatedChoices[index] = value;
        setFormData({ ...formData, choices: updatedChoices });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/addquiz', formData); // Replace with your API endpoint
            console.log(response.data);
            alert('Quiz added successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to add quiz.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Add Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Lesson ID:</label>
                    <input
                        type="number"
                        name="lesson_id"
                        value={formData.lesson_id}
                        onChange={handleChange}
                        placeholder="Enter lesson ID"
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Question:</label>
                    <textarea
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        placeholder="Enter quiz question"
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Correct Answer:</label>
                    <input
                        type="text"
                        name="correct_answer"
                        value={formData.correct_answer}
                        onChange={handleChange}
                        placeholder="Enter the correct answer"
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Choices:</label>
                    {formData.choices.map((choice, index) => (
                        <div key={index} style={{ marginTop: '5px' }}>
                            <input
                                type="text"
                                value={choice}
                                onChange={(e) => handleChoiceChange(index, e.target.value)}
                                placeholder={`Choice ${index + 1}`}
                                required
                                style={{ width: '100%', padding: '8px' }}
                            />
                        </div>
                    ))}
                </div>

                <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddQuizForm;
