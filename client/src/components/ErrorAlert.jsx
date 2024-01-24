/* eslint-disable react/prop-types */
const ErrorAlert = ({error}) => {
    return (
        <div
            role="alert"
            className="rounded border-s-4 border-red-500 bg-red-50 p-4 dark:border-red-600 dark:bg-red-900"
        >
            <strong className="block font-medium text-red-800 dark:text-red-100"> {error.title} </strong>

            <p className="mt-2 text-sm text-red-700 dark:text-red-200">
                {error.description}
            </p>
        </div>
    )
}

export default ErrorAlert