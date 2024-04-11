"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
// import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

function ProfilePage() {
  const session = useSession();
  const { status } = session;

  const [userName, setUserName] = useState(session?.data?.user?.name || "");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "authenticated") setUserName(session.data.user.name);
  }, [session, status]);

  const handleProfileInfoUpdate = async (e) => {
    e.preventDefault();
    setSaved(false);
    setSaving(true);

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName }),
    });
    setSaving(false);

    if (res.ok) {
      setSaved(true);
    }

    setTimeout(() => {
      setSaved(false);
    }, 5000);
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      await fetch("/api/upload", {
        method: "POST",
        // headers: { "Content-Type": "multipart/form-data" },
        body: data,
      });
    }
  };

  if (status === "loading") return "Loading...";

  if (status === "unauthenticated") return redirect("/login");

  const userImage = session?.data?.user?.image;

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl ">ProfilePage</h1>
      <div className="max-w-md mx-auto">
        {saved && (
          <h2 className="text-center bg-green-200 p-4 rounded-lg border-4 border border-green-300">
            Profile saved!
          </h2>
        )}
        {saving && (
          <h2 className="text-center bg-green-200 p-4 rounded-lg border-4 border-blue-300">
            Saving...
          </h2>
        )}

        <div className="flex gap-4 items-center">
          <div>
            <div className="p-2 rounded-lg relative">
              <Image
                className="rounded-lg w-full h-full mb-1"
                width={250}
                height={250}
                src={userImage}
                alt="avatar"
              />
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="block border rounded-lg p-2 text-center border-gray-300 cursor-pointer">
                  Change
                </span>
              </label>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              placeholder="First and Last name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input type="email" disabled value={session?.data?.user?.email} />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
