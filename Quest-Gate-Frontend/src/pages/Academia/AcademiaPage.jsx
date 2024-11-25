import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AcademiaPage.module.css';
import teacher from '../../assets/Academia/TEACHER.png';
import backButton from '../../assets/Quest/backbutton.png';
import { Link } from 'react-router-dom';

function AcademiaPage() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryData, setCategoryData] = useState([]);
    const [categories, setCategories] = useState([]);

    // Fetch lessons and categories from the backend
    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/getLessons'); 
                const lessons = response.data;

                // Extract unique categories
                const uniqueCategories = [...new Set(lessons.map(lesson => lesson.category))];
                setCategories(uniqueCategories);
            } catch (err) {
                console.error('Error fetching lessons:', err);
            }
        };

        fetchLessons();
    }, []);

    // Function to handle category click and fetch lessons for that category
    const handleCategoryClick = async (category) => {
        setSelectedCategory(category); 

        try {
            const response = await axios.get('http://localhost:3000/api/getLessons');
            const filteredLessons = response.data.filter(lesson => lesson.category === category);
            setCategoryData(filteredLessons);
        } catch (err) {
            console.error("Error fetching category data:", err);
        }
    };

    return (
        <div className={styles.container}>
            <img src={teacher} alt="Teacher" className={styles.teacher} />
            <Link to="/town">
                <img src={backButton} alt="Back to Town" className={styles.backbutton} />
            </Link>
            <div className={styles.frame}>
                <h1 className={styles.text}>Select Lesson Type</h1>
                {selectedCategory ? (
                    <div className={styles.categoryContent}>
                        <button 
                            className={styles.backToCategoriesButton} 
                            onClick={() => setSelectedCategory('')}
                        >
                            Back
                        </button>
                        <div className={styles.lessonsContainer}>
                            {categoryData.length ? (
                                categoryData.map((lesson, index) => (
                                    <Link 
                                        to="/lessonContent" 
                                        key={index} 
                                        state={{
                                            lessonId: lesson.lesson_id, 
                                            lessonName: lesson.lesson_name, 
                                            lessonContent: lesson.lesson_content
                                        }}
                                        className={styles.lessons}
                                    >
                                        {lesson.lesson_name}
                                    </Link>
                                ))
                            ) : (
                                <p>No lessons available for this category.</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={styles.lessonsContainer}>
                        {categories.length ? (
                            categories.map((category, index) => (
                                <div
                                    key={index}
                                    className={styles.lessons}
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    {category}
                                </div>
                            ))
                        ) : (
                            <p>Loading categories...</p>
                        )}
                    </div>
                )}
                <p className={styles.scroll}>↓ Scroll Down for more ↓</p>
            </div>
        </div>
    );
    
}

export default AcademiaPage;
