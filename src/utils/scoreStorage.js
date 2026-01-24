const STORAGE_KEY = 'ecs_quiz_history';

export const saveQuizResult = (result) => {
    try {
        const history = getQuizHistory();
        history.push(result);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        return true;
    } catch (error) {
        console.error('Failed to save quiz result:', error);
        return false;
    }
};

export const getQuizHistory = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to load quiz history:', error);
        return [];
    }
};

export const clearQuizHistory = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Failed to clear quiz history:', error);
        return false;
    }
};

export const getQuizStats = () => {
    const history = getQuizHistory();

    if (history.length === 0) {
        return null;
    }

    // Overall stats
    const totalQuizzes = history.length;
    const totalQuestions = history.reduce((sum, quiz) => sum + quiz.questionsToAsk, 0);
    const totalCorrect = history.reduce((sum, quiz) => sum + quiz.score, 0);
    const averagePercentage = (totalCorrect / totalQuestions * 100).toFixed(1);
    const passRate = (history.filter(q => q.passed).length / totalQuizzes * 100).toFixed(1);

    // Category breakdown
    const categoryStats = {};
    history.forEach(quiz => {
        Object.entries(quiz.categoryScores || {}).forEach(([category, scores]) => {
            if (!categoryStats[category]) {
                categoryStats[category] = { correct: 0, total: 0 };
            }
            categoryStats[category].correct += scores.correct;
            categoryStats[category].total += scores.total;
        });
    });

    // Convert to percentages
    const categoryPercentages = Object.entries(categoryStats).map(([category, scores]) => ({
        category,
        percentage: ((scores.correct / scores.total) * 100).toFixed(1),
        correct: scores.correct,
        total: scores.total
    })).sort((a, b) => b.percentage - a.percentage);

    // Recent trend (last 10 quizzes)
    const recentQuizzes = history.slice(-10);
    const trend = recentQuizzes.map(quiz => ({
        date: new Date(quiz.timestamp).toLocaleDateString(),
        percentage: quiz.percentage
    }));

    return {
        totalQuizzes,
        totalQuestions,
        totalCorrect,
        averagePercentage,
        passRate,
        categoryPercentages,
        strongestCategory: categoryPercentages[0],
        weakestCategory: categoryPercentages[categoryPercentages.length - 1],
        trend,
        recentQuizzes
    };
};