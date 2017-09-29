export const thunkPromiseChainErrorHandler = function( errorSource ) {
    return function thunkErrorProcessor( error ) {
        if (error.source && error.source === errorSource) {
            console.log(`>>> ERROR: ${error} <<<`)
        } else {
            throw error;
        }
    }
};
