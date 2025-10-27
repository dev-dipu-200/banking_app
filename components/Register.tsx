'use client'
export default function Register({width ="400px", size = "md", fields = [
    { id: "email", label: "Email", type: "email" },
    { id: "password", label: "Password", type: "password" },
    { id: "confirmPassword", label: "Confirm Password", type: "password" },
    { id: "type", label: "Account Type", type: "text" },
    { id: "phone", label: "Phone Number", type: "tel" },
  ] }) {
    const sizeClasses = { 
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
    }; 
    return (
        <div className="flex items-center justify-center min-h-[70vh] font-sans">
            <form style={{width}} className={`p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 w-full ${sizeClasses[size] || sizeClasses.md}`}>
                {/* <h2 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-zinc-200 text-center">Register</h2> */}
                {fields.map((field) => (
                    <div key={field.id} className="mb-4">
                        <label className="block text-zinc-700 dark:text-zinc-300 mb-2" htmlFor={field.id}>
                            {field.label}
                        </label>
                        <input
                            type={field.type}
                            id={field.id}
                            className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                    onClick={() => alert('Registration functionality to be implemented')}
                >
                    Register
                </button>
            </form>
        </div>
    );
}