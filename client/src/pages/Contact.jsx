import { useState } from "react";
import { Page, PageHead, Reveal } from "../components/motion.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "ok" | "error"

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("ok");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <Page>
      <PageHead si="සම්බන්ධ වන්න" en="CONTACT · WRITE TO US" />

      <section className="section" style={{ background: "var(--bg-panel)" }}>
        <div className="contact__wrap">
          <Reveal>
            <p className="bio__body" style={{ textAlign: "center" }}>
              කපුගේ මහතාගේ මතක, ඡායාරූප, පටිගත කිරීම් හෝ තොරතුරු ඔබ සතුව ඇත්නම්
              — කරුණාකර අපට ලියන්න. මෙම වෙබ් අඩවිය ඔහුගේ උරුමය සුරැකීමට
              කැප වූවකි.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="contact__form" onSubmit={onSubmit}>
              <div className="field">
                <label>නම · NAME</label>
                <input
                  name="name" value={form.name} onChange={onChange}
                  required placeholder="ඔබගේ නම"
                />
              </div>
              <div className="field">
                <label>විද්‍යුත් තැපෑල · EMAIL</label>
                <input
                  type="email" name="email" value={form.email} onChange={onChange}
                  required placeholder="you@example.com"
                />
              </div>
              <div className="field">
                <label>පණිවිඩය · MESSAGE</label>
                <textarea
                  name="message" value={form.message} onChange={onChange}
                  required placeholder="ඔබගේ පණිවිඩය..."
                />
              </div>
              <button className="btn btn--gold" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "යවමින්..." : "පණිවිඩය යවන්න"} <span>· SEND</span>
              </button>
              {status === "ok" && (
                <p className="contact__status">ස්තූතියි! ඔබගේ පණිවිඩය ලැබුණා. 🙏</p>
              )}
              {status === "error" && (
                <p className="contact__status" style={{ color: "var(--brick)" }}>
                  යැවීම අසාර්ථකයි — server එක ක්‍රියාත්මකදැයි බලන්න.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
