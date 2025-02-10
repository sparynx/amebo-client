import React from "react";
import { Lightbulb, Users, Globe, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Welcome to <span className="text-blue-600">Amebo</span> 🗞️
        </h1>
        <p className="mt-4 text-gray-600 text-base sm:text-lg">
          Your go-to platform for fresh, engaging, and community-driven stories.
          We bring you the latest trends, breaking news, and untold stories from
          around the world.
        </p>
      </div>

      {/* Vision Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="flex items-start space-x-4">
          <Lightbulb size={36} className="text-blue-500 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
            <p className="text-gray-600 mt-2">
              To create an inclusive platform where everyone has a voice, and stories
              inspire meaningful conversations.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Users size={36} className="text-blue-500 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Community Driven</h3>
            <p className="text-gray-600 mt-2">
              Amebo thrives on community engagement, ensuring diverse perspectives
              are heard and valued.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="flex items-start space-x-4">
          <Globe size={36} className="text-blue-500 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Global Reach</h3>
            <p className="text-gray-600 mt-2">
              We break barriers by delivering stories that matter, from local
              communities to the global stage.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <ShieldCheck size={36} className="text-blue-500 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Authenticity</h3>
            <p className="text-gray-600 mt-2">
              At Amebo, we value credibility and ensure our content is factual,
              engaging, and impactful.
            </p>
          </div>
        </div>
      </div>

      {/* Inspiring Message */}
      <div className="mt-12 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Be Part of the Story! 📢
        </h2>
        <p className="mt-4 text-gray-600 text-base sm:text-lg">
          Your voice matters. Whether you're a storyteller, journalist, or just a
          curious mind, Amebo is your space to stay informed and share your
          perspective with the world.
        </p>
      </div>
    </div>
  );
};

export default About;
