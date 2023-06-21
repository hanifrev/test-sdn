import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  useGetOneUsersQuery,
  useUpdateUsersMutation,
} from "@/services/apiSlice";

const EditModal = ({
  closeModal,
  toastSuccess,
  idParams,
}: {
  closeModal: any;
  toastSuccess: any;
  idParams: any;
}) => {
  const [updateUsers, { isLoading, isSuccess, isError }] =
    useUpdateUsersMutation();

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("Loading...");
  const [email, setEmail] = useState<string>("Loading...");
  // const [password, setPassword] = useState<string>("Loading...");
  const [bio, setBio] = useState<string>("Loading...");
  const [avatar, setAvatar] = useState<string>("Loading...");
  const [roleId, setRoleId] = useState<string>("Loading...");

  const { data: oneData, refetch } = useGetOneUsersQuery(idParams);
  // console.log(oneData && oneData);

  useEffect(() => {
    if (oneData) {
      setId(oneData.data._id);
      setName(oneData.data.name);
      setEmail(oneData.data.email);
      setBio(oneData.data.bio);
      setAvatar(oneData.data.avatar);
      setRoleId(oneData.data.role._id);
    }
  }, [oneData, idParams]);

  // console.log(id);

  useEffect(() => {
    refetch();
  }, [idParams]);

  const modalRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleUpdate = (e: any) => {
    e.preventDefault();
    updateUsers({ id, name, email, bio, avatar, roleId });
    e.target.reset();
  };

  {
    isSuccess &&
      (() => {
        closeModal();
        toastSuccess();
      })();
  }

  return (
    <div id="edit-form" className="text-white absolute" ref={modalRef}>
      {isLoading ? (
        <div className="font-bold h-[400px] flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <form onSubmit={(e) => handleUpdate(e)}>
          <div className="max-w-xs m-auto">
            <h3 className="font-bold text-center py-3">EDIT USER</h3>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Bio</span>
            </label>
            <input
              type="text"
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
              // ref={inputRef}
            />
            <label className="label">
              <span className="label-text">Avatar</span>
            </label>
            <input
              type="url"
              id="avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
              // ref={inputRef}
            />
            <label className="label">
              <span className="label-text">Select Role</span>
            </label>
            <select
              className="select select-primary w-full max-w-xs"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
            >
              <option disabled selected>
                Select Role Here
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
              EDIT
            </button>
          </div>
        </form>
      )}

      {/* {isSuccess && <div>Post created successfully!</div>} */}
      {/* {isError && <div>Error creating post.</div>} */}
    </div>
  );
};

export default EditModal;
