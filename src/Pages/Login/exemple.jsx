import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../Context/ContextProvider";

// Composant pour l'écran de chargement
const LoadingScreen = () => (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
    </div>
);

export default function Login() {
        const emailRef = useRef();
        const passwordRef = useRef();
    const [visible, setVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // État pour la visibilité du mot de passe

    const { setToken, setUser } = useStateContext();

    const handleKeyPressEmail = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (emailRef.current.value.trim() !== "") {
                setVisible(true);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible); // Basculer la visibilité
    };

    const Submit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axios
            .post("http://127.0.0.1:8000/api/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setTimeout(() => {
                    setToken(data.token);
                    setIsSubmitting(false);
                }, 5000);
            })
            .catch((error) => {
                console.log(error);
                setIsSubmitting(false);
            });
    };

    return (
        <>
            {isSubmitting && <LoadingScreen />}
            <div className="container h-full mx-auto px-1 pt-10">
                <div className="flex flex-col lg:flex-row items-center justify-center mt-5 pt-10 lg:mx-80 h-full">
                    <div className="xl:w-100 w-full justify-center px-10 pb-10 bg-[#f1f1f4] rounded-xl">
                        <div className="w-full flex flex-col items-center xl:items-center mb-6">
                            <img
                                src="Logo_horizontal.svg"
                                alt="Logo"
                                className="w-20 h-20"
                            />
                            <h1 className="text-xl md:text-xl mt-2 font-extrabold text-[#A462A4] leading-tight text-center xl:text-left">
                                Connectez-vous
                            </h1>
                        </div>
                        <form
                            className="p-4 bg-white shadow-lg rounded-xl"
                            onSubmit={Submit}
                        >
                            <div>
                                <h1 className="text-xs my-2 text-gray-700">
                                    Renseignez votre adresse email
                                </h1>
                                <input
                                    className="bg-white password-toggle outline-none w-full bg-transparent pl-3 h-10 border-[1px] border-gray-200 rounded-md hover:border-purple-300 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 duration-200 text-sm placeholder-sm"
                                    type="email"
                                    placeholder="votre-adresse@gmail.com"
                                    ref={emailRef}
                                    name="email"
                                    onKeyPress={handleKeyPressEmail}
                                    disabled={isSubmitting}
                                />
                            </div>
                            {visible && (
                                <div>
                                    <p className="mt-6 text-xl text-[#A462A4]">
                                        On se connait déjà !
                                    </p>
                                    <p className="mb-2 text-gray-700 text-xs">
                                        Renseignez vos mot de passe
                                    </p>
                                    <div className="relative inline-flex w-full">
                                        <input
                                            type={
                                                isPasswordVisible
                                                    ? "text"
                                                    : "password"
                                            }
                                            ref={passwordRef}
                                            name="password"
                                            className="
                                            password bg-white password-toggle outline-none w-full bg-transparent pl-2 h-10 border-[1px] border-gray-200 rounded-md hover:border-purple-300 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 duration-200 text-gray-700bg-white password-toggle outline-none w-full bg-transparent pl-3 h-10 border-[1px] border-gray-200 rounded-md hover:border-purple-300 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 duration-200 text-sm placeholder-sm pr-10"
                                            disabled={isSubmitting}
                                        />
                                        <i
                                            className={`fa-solid ${
                                                isPasswordVisible
                                                    ? "fa-eye-slash text-xs"
                                                    : "fa-eye text-xs"
                                            } absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer`}
                                            onClick={togglePasswordVisibility}
                                        />
                                    </div>
                                    <div className="grid mt-6 place-items-center">
                                        <button
                                            type="submit"
                                            className={`rounded-xl w-full bg-[#a462a4] px-4 py-2 text-white flex justify-center hover:bg-[#A462A4]/90 duration-200 text-sm ${
                                                isSubmitting
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                            disabled={isSubmitting}
                                        >
                                            Connexion
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                        <div className="grid mt-4 place-items-start">
                            <Link
                                to="/register"
                                className="text-[#a462a4] underline-offset-4 text-xs underline font-bold"
                            >
                                Pas encore de compte ? Inscrivez-vous
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}