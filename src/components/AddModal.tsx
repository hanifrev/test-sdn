import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useAddUsersMutation } from "@/services/apiSlice";

const AddModal = ({
  closeModal,
  toastSuccess,
}: {
  closeModal: any;
  toastSuccess: any;
}) => {
  const [addUsers, { isLoading, isSuccess, isError }] = useAddUsersMutation();

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [roleId, setRoleId] = useState<string>("");

  const handleAdd = (e: any) => {
    e.preventDefault();
    addUsers({ name, email, password, bio, avatar, roleId });
    e.target.reset();
  };

  const modalRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  {
    isSuccess &&
      (() => {
        closeModal();
        toastSuccess();
      })();
  }

  return (
    <div id="add-form" className="text-white absolute" ref={modalRef}>
      {isLoading ? (
        <div className="font-bold h-[400px] flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <form onSubmit={(e) => handleAdd(e)}>
          <div className="max-w-xs m-auto">
            <h3 className="font-bold text-center py-3">ADD USER</h3>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              id="name"
              //   value={name}
              placeholder="Type name here..."
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
              // ref={inputRef}
            />
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Type email here..."
              //   value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              //   value={name}
              placeholder="Type password here..."
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
              // ref={inputRef}
            />
            <label className="label">
              <span className="label-text">Bio</span>
            </label>
            <input
              type="text"
              id="bio"
              //   value={name}
              placeholder="Type your bio here..."
              onChange={(e) => setBio(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
              // ref={inputRef}
            />
            <label className="label">
              <span className="label-text">Avatar</span>
            </label>
            <input
              type="text"
              id="avatar"
              //   value={name}
              placeholder="Paste image URL here..."
              onChange={(e) => setAvatar(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
              // ref={inputRef}
            />

            <label className="label">
              <span className="label-text">Select Role</span>
            </label>
            <select
              className="select select-primary w-full max-w-xs"
              //   value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
            >
              <option disabled selected>
                Select Rolo Here
              </option>
              <option
                value="648c4a358f6c1f606c750c1c"
                selected={roleId === "648c4a358f6c1f606c750c1c"}
              >
                Admin
              </option>
              <option
                value="648c4a358f6c1f606c750c1d"
                selected={roleId === "648c4a358f6c1f606c750c1d"}
              >
                User
              </option>
            </select>

            <button
              className="btn btn-primary mt-8 px-16 w-full "
              type="submit"
            >
              ADD USER
            </button>
          </div>
        </form>
      )}

      {/* {isSuccess && <div>Post created successfully!</div>} */}
      {/* {isError && <div>Error creating post.</div>} */}
    </div>
  );
};

export default AddModal;
