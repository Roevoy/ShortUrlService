import { catchError, throwError } from 'rxjs';
export const httpInterceptor = (req, next) => {
    const modifiedReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return next(modifiedReq).pipe(catchError((error) => {
        let errorMessage = "An error occurred!";
        switch (error.status) {
            case 401:
                errorMessage = "Failed to login. Please check your email and password.";
                break;
            case 403:
                errorMessage = "Access denied. You do not have permission to perform this action.";
                break;
            case 404:
                errorMessage = "Resource not found. Please check the URL.";
                break;
            case 0:
                errorMessage = "Server is not responding. Please check your internet connection.";
                break;
            default:
                errorMessage = `Unknown error: ${error.message}`;
                break;
        }
        if (error.status >= 500 && error.status < 600)
            errorMessage = "Server error. Please try again later.";
        console.error("HTTP Error:", error);
        return throwError(() => new Error(errorMessage));
    }));
};
