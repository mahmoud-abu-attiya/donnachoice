import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Hero from "../components/Hero";

export default function About() {
  const ar = useSelector((state) => state.langs.value);
  return (
    <div dir={ar ? "rtl" : "ltr"}>
      <Hero title={ar ? "من نحن" : "about us"} not={false} />
      <div className="container text-center py-10">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
          {ar
            ? "نحن نستثمر في إمكانات العالم"
            : "We invest in the world’s potential"}
        </h1>
        <p className="mb-6 text-lg text-start font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
          {ar
            ? 
            `
               "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور
               أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
               أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس
               أيوتي أريري دولار إن ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت
               نيولا باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون بروايدينت ,سيونت ان كيولبا
               كيو أوفيسيا ديسيريونتموليت انيم أيدي ايست لابوريوم."
               "سيت يتبيرسبايكياتيس يوندي أومنيس أستي ناتيس أيررور سيت فوليبتاتيم أكيسأنتييوم
               دولاريمكيو لايودانتيوم,توتام ريم أبيرأم,أيكيو أبسا كيواي أب أللو أنفينتوري فيرأتاتيس ايت
               كياسي أرشيتيكتو بيتاي فيتاي ديكاتا سيونت أكسبليكابو. نيمو أنيم أبسام فوليوباتاتيم كيواي
               فوليوبتاس سايت أسبيرناتشر أيوت أودايت أيوت فيوجايت, سيد كيواي كونسيكيونتشر ماجناي
               دولارس أيوس كيواي راتاشن فوليوبتاتيم سيكيواي نيسكايونت. نيكيو بوررو كيوايسكيوم
               ايست,كيواي دولوريم ايبسيوم كيوا دولار سايت أميت, كونسيكتيتيور,أديبايسكاي فيلايت, سيد
               كيواي نون نيومكيوام ايايوس موداي تيمبورا انكايديونت يوت لابوري أيت دولار ماجنام
               ألايكيوام كيوايرات فوليوبتاتيم. يوت اينايم أد مينيما فينيام, كيواس نوستريوم أكسيركايتاشيم`
            : 
            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis ipsa, optio provident ab officiis mollitia alias neque sunt voluptatum beatae magnam? Cupiditate aliquid nisi voluptatibus architecto officia odit eum quasi.
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis ipsa, optio provident ab officiis mollitia alias neque sunt voluptatum beatae magnam? Cupiditate aliquid nisi voluptatibus architecto officia odit eum quasi.`}
        </p>
        <Link href={"/help"}>
          <a className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-primary-100 rounded-lg hover:bg-primary-200 focus:ring-4">
            {ar ? "تواصل معنا" : "Get touch with us"}
          </a>
        </Link>
      </div>
    </div>
  );
}
