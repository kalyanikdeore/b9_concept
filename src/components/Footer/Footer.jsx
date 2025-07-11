import React from "react";
import { useNavigate } from "react-router-dom";
import {
  IoLocationOutline,
  IoMailOutline,
  IoCallOutline,
} from "react-icons/io5";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaRss,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

import Contentwrapper from "../../components/Contentwrapper/Contentwrapper";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white py-12 w-full px-8">
      <Contentwrapper>
        <div className="flex flex-wrap justify-center gap-8">
          {/* About Section */}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4 text-white-500">
              ABOUT B9 CONCEPT
            </h3>
            <p className="text-lg text-gray-300">
              If you go to therapy, you'll have meetings with a therapist to
              talk and learn. You'll learn skills to cope, feel better, and get
              help with the problem you're having.
            </p>
          </div>

          {/* Our Services */}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4 text-white-500">
              OUR PAGES
            </h3>
            <ul className="text-lg space-y-2 list-disc list-inside text-gray-300">
              <li>
                <a
                  href="/aboutus"
                  className="hover:text-gray-500 cursor-pointer"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="/process"
                  className="hover:text-gray-500 cursor-pointer"
                >
                  Our Process
                </a>
              </li>
              <li>
                <a
                  href="/achievement"
                  className="hover:text-gray-500 cursor-pointer"
                >
                  Achievement
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-gray-500 cursor-pointer"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/Contactus"
                  className="hover:text-gray-500 cursor-pointer"
                >
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Blog Section */}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4 text-white-500">
              LATEST BLOGS
            </h3>
            <div>
              {[
                { title: "How Advanced Energy ", date: "Aug 28, 2025" },
                {
                  title: "Health is Naturally",
                  date: "July 15, 2025",
                },
                {
                  title: "Beat stress Naturally",
                  date: "June 10, 2025",
                },
              ].map((blog, index) => (
                <div className="mb-4" key={index}>
                  <p className="text-white font-medium">{blog.title}</p>
                  <span className="text-sm text-gray-400">
                    By Admin / {blog.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white-500">CONTACT US</h3>
            <div className="text-left flex flex-col text-gray-300 space-y-2 mt-4">
              <p>
                <IoLocationOutline size={20} className="inline mr-2" />
                123 Greenway Street, EcoCity, Earth
              </p>
              <p>
                <MdOutlineEmail size={20} className="inline mr-2" />
                support@envocare.com
              </p>
              <p>
                <IoCallOutline size={20} className="inline mr-2" />
                +1 (217) 202-2114
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-3 mt-4">
              {[
                FaFacebookF,
                FaTwitter,
                FaLinkedinIn,
                FaRss,
                FaYoutube,
                FaInstagram,
              ].map((Icon, index) => (
                <div
                  key={index}
                  className="bg-gray-500 p-3 rounded-full text-white hover:text-gray-900 cursor-pointer"
                >
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-600 pt-6 mt-6 text-gray-300">
          <p className="text-gray-300 ">
            © 2025 Copyright :{" "}
            <a
              href="http://b9concept.demovoting.com/"
              rel="noopener noreferrer"
              className="text-gray-400 hover:underline"
            >
              B9 Concept
            </a>{" "}
            All rights reserved.
          </p>
          <p>
            <a href="https://richsol.com/" rel="noopener noreferrer">
              Developed By Rich System Solutions Pvt Ltd
            </a>
          </p>
        </div>
      </Contentwrapper>
    </footer>
  );
};

export default Footer;
