import React from "react";
import Hero from "../components/Hero";
import { useSelector } from "react-redux";
import swal from "sweetalert";

export default function Help() {
   const ar = useSelector((state) => state.langs.value);
   const sweetalert = (form) => {
      swal({
         title: ar ? "شكرًا !" : "Thanks !",
         text: ar ? "سوف نتصل بك قريبا." : "We will contact you soon.",
         icon: "success",
         button: ar ? "حسنا" : "Ok",
      });
      form.reset();
   };
   const sendEmail = (e) => {
      e.preventDefault();
      let formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      console.log(data);
      fetch("https://formsubmit.co/ajax/mahmoud.abuattiya106@gmail.com", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: data,
      }).then(res => {
         sweetalert(e.target)
         console.log(res);
      });
   };
   return (
      <>
         <Hero not={true} title={ar ? "تواصل معنا" : "contact us"} />
         <div dir={ar ? "rtl" : "ltr"} className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 justify-center my-6 md:my-8 gap-8">
               <div className="flex flex-col gap-4 text-center">
                  <div className="bg-gray-100 p-10 rounded w-fit mx-auto relative shadow">
                     <i
                        className="fas fa-map-marker-alt text-gray-500 drop-shadow text-4xl absolute top-1/2 left-1/2"
                        style={{ transform: "translate(-50%, -50%)" }}
                     ></i>
                  </div>
                  <h3 className="text-2xl font-bold capitalize">
                     {ar ? "الموقع" : "location"}
                  </h3>
                  <p className="mb-8 lg:mb-16 font-light text-gray-500">
                     {ar
                        ? "سنكون سعداء جدا إذا قمت بزيارتنا"
                        : "We will be very happy if you visit us"}{" "}
                     <br />
                     <a
                        href="https://goo.gl/maps/SMjrkkm4oSRut8pL7"
                        target={"_blank"}
                        rel="noreferrer"
                        className="text-blue-700 font-normal hover:underline"
                     >
                        {ar
                           ? "فوكس هيلز لوسيل - الدوحة - قطر"
                           : "Fox Hills Lusail - Doha -Qatar"}
                     </a>
                  </p>
               </div>
               <div className="flex flex-col gap-4 text-center">
                  <div className="bg-gray-100 p-10 rounded w-fit mx-auto relative shadow">
                     <i
                        className="fas fa-phone-alt text-gray-500 drop-shadow text-4xl absolute top-1/2 left-1/2"
                        style={{ transform: "translate(-50%, -50%)" }}
                     ></i>
                  </div>
                  <h3 className="text-2xl font-bold capitalize">
                     {ar ? "اتصل بنا" : "call us"}
                  </h3>
                  <p className="mb-8 lg:mb-16 font-light text-gray-500">
                     {ar
                        ? "اتصل بنا للتحدث إلى أحد أعضاء فريقنا. نحن دائما سعداء للمساعدة."
                        : "Call us to speak to a member of our team. We are always happy to help."}{" "}
                     <br />
                     <a
                        dir="ltr"
                        href="tel:+97433189999"
                        className="text-blue-700 font-normal hover:underline"
                     >
                        +97433189999
                     </a>
                  </p>
               </div>
               <div className="flex flex-col gap-4 text-center">
                  <div className="bg-gray-100 p-10 rounded w-fit mx-auto relative shadow">
                     <i
                        className="fas fa-envelope text-gray-500 drop-shadow text-4xl absolute top-1/2 left-1/2"
                        style={{ transform: "translate(-50%, -50%)" }}
                     ></i>
                  </div>
                  <h3 className="text-2xl font-bold capitalize">
                     {ar ? "البريد الإلكتروني" : "e-mail"}
                  </h3>
                  <p className="mb-8 lg:mb-16 font-light text-gray-500">
                     {ar
                        ? "يمكنك ايضا التواصل معنا عبر البريد الالكتروني"
                        : "You can also contact us via e-mail."}{" "}
                     <br />
                     <a
                        href="mailto:info@donnachoice.com"
                        className="text-blue-700 font-normal hover:underline"
                     >
                        info@donnachoice.com
                     </a>
                  </p>
               </div>
               {/* <div>phone</div>
               <div>email</div> */}
            </div>
            <section className="bg-white">
               <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                  <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
                     {ar ? "اتصل بنا" : "Contact Us"}
                  </h2>
                  <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
                     {ar
                        ? "هل لديك مشكلة فنية؟ تريد إرسال ملاحظات حول إصدار تجريبي خاصية؟ هل تحتاج إلى تفاصيل حول خطة أعمالنا؟ دعنا نعرف."
                        : "Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know."}
                  </p>
                  <form onSubmit={sendEmail} className="space-y-8">
                     <div>
                        <label
                           htmlFor="email"
                           className="block mb-2 text-sm font-medium text-gray-900"
                        >
                           {ar ? "بريدك الالكتروني" : "Your email"}
                        </label>
                        <input
                           name="email"
                           type="email"
                           id="email"
                           className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                           placeholder="name@flowbite.com"
                           required
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="subject"
                           className="block mb-2 text-sm font-medium text-gray-900"
                        >
                           {ar ? "موضوع" : "Subject"}
                        </label>
                        <input
                           name="subject"
                           type="text"
                           id="subject"
                           className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                           placeholder={
                              ar
                                 ? "اسمح لنا أن نعرف كيف يمكننا مساعدتك"
                                 : "Let us know how we can help you"
                           }
                           required
                        />
                     </div>
                     <div className="sm:col-span-2">
                        <label
                           htmlFor="message"
                           className="block mb-2 text-sm font-medium text-gray-900"
                        >
                           {ar ? "رسالتك" : "Your message"}
                        </label>
                        <textarea
                           name="message"
                           id="message"
                           rows={6}
                           className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                           placeholder={
                              ar ? "اترك تعليقا..." : "Leave a comment..."
                           }
                           defaultValue={""}
                        />
                     </div>
                     <button
                        type="submit"
                        className="text-white max-w-screen-md w-full text-xl bg-gradient-to-r from-primary-200 via-primary-200 to-pink-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2"
                     >
                        {ar ? "إرسال" : "Send"}
                     </button>
                  </form>
               </div>
            </section>
         </div>
      </>
   );
}
