import { useEffect, useState } from "react";
import home_page_image from "../../assets/home_page_image.png"
import api from "../../api";
import { Link } from "react-router-dom";

const Carousel = () => {

    const [activeDonor, setActiveDonor] = useState(0)
    const [livesSaved, setLivesSaved] = useState(0)

    useEffect(() => {
        const fetchData = async() => {
            try{
                // getting total donor
                const res = await api.get(`/donor/`)
                
                // lives seved calculations
                let sum = 0;
                {res.data.results.map((val) => (
                    sum += val.total_donations
                ))}
                
                setActiveDonor(res.data.count)
                setLivesSaved(sum)
                
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
    }, [])


    return (
        <>
         <section className="relative overflow-hidden bg-red-50">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-r from-red-100 via-white to-red-50 opacity-90"></div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Content */}
                <div>
                    <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        আপনার একটি ছোট সাহায্য হতে পারে কারো নতুন জীবনের আশা
                    </span>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                        রক্ত দিন, <br />
                    <span className="text-red-600"> জীবন বাঁচান ❤️</span>
                    </h1>

                    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                        প্রতিদিন অসংখ্য মানুষ জরুরি রক্তের প্রয়োজনে সংগ্রাম করেন। আপনার এক ব্যাগ রক্ত একজন মায়ের জীবন বাঁচাতে পারে, একটি শিশুর মুখে হাসি ফিরিয়ে আনতে পারে, অথবা কোনো রোগীর জন্য নতুন আশার আলো হতে পারে।
                        আমাদের প্ল্যাটফর্মের মাধ্যমে সহজেই রক্তদাতা খুঁজুন, জরুরি রক্তের অনুরোধ করুন এবং মানবতার এই মহৎ উদ্যোগে অংশ নিন। একসাথে আমরা গড়ে তুলতে পারি একটি নিরাপদ ও সহানুভূতিশীল সমাজ।
                        আজই রক্তদাতা হোন — কারণ আপনার রক্ত, কারো জীবনের উপহার।
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-xl font-semibold shadow-lg transition duration-300">
                        <Link to="/become-donor">Become a Donor</Link>
                    </button>

                    <button className="border border-red-600 text-red-600 hover:bg-red-50 px-7 py-3 rounded-xl font-semibold transition duration-300">
                        <Link to="/find-donor">Find Blood</Link>
                    </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-12 flex gap-10">
                    <div>
                        <h2 className="text-3xl font-bold text-red-600">{activeDonor}+</h2>
                        <p className="text-gray-600">Active Donors</p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-red-600">{livesSaved}+</h2>
                        <p className="text-gray-600">Lives Saved</p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-red-600">24/7</h2>
                        <p className="text-gray-600">Emergency Support</p>
                    </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative">
                    <div className="absolute -top-6 -left-6 w-72 h-72 bg-red-200 rounded-full blur-3xl opacity-40"></div>

                        <img
                        src= {home_page_image}
                        alt="Blood Donation"
                        className="relative w-full max-w-lg mx-auto drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>
         </section>
        </>
    );
};
export default Carousel;