
module.exports = {
    handleRejection: (reason, promise) => {
        console.error('Rejection non gérée à:', promise, 'raison:', reason);
    },
    
    handleException: (error) => {
        console.error('Exception non gérée:', error);
        process.exit(1);
    }
};