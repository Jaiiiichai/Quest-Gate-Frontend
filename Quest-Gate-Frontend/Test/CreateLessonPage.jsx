import { useState } from 'react';
import axios from 'axios';
import './CreateLessonPage.css'

const CreateLessonPage = () => {
  const [lessonName, setLessonName] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/createLesson', {
        lesson_name: lessonName,
        lesson_content: lessonContent,
        category: category,
        difficulty: difficulty,
      });

      setMessage('Lesson created successfully!');
      setLessonContent('')
      setCategory('')
      setLessonName('')
      setDifficulty(1)
      console.log(response.data); // Log the response if needed
    } catch (err) {
      setMessage('Failed to create lesson.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Create New Lesson</h1>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="lessonName">Lesson Name:</label>
          <input
            type="text"
            id="lessonName"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lessonContent">Lesson Content:</label>
          <textarea
            id="lessonContent"
            value={lessonContent}
            onChange={(e) => setLessonContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            required
          >
            <option value={1}>Beginner</option>
            <option value={2}>Intermediate</option>
            <option value={3}>Advanced</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLessonPage;
