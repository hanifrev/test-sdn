import React from "react";
// import data from "./dummy.json";
import { useDispatch } from "react-redux";
import { useGetAllUsersQuery } from "@/services/apiSlice";

const UsersTable = () => {
  function sliceString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
      return str;
    }

    const sliceLength = Math.floor((maxLength - 3) / 2);
    const startSlice = str.slice(0, sliceLength);
    const endSlice = str.slice(-sliceLength);

    return `${startSlice}...${endSlice}`;
  }

  const dispath = useDispatch();
  const getData: any = useGetAllUsersQuery();
  const data = getData.data.data.docs;
  // console.log(data);

  return (
    <div id="users-table">
      <div className="flex justify-end w-[864px] mx-auto py-2">
        <button
          className="w-24 text-sm p-1 rounded-md text-white ml-6 info bg-green-500 hover:bg-green-400"
          // onClick={handleSignout}
        >
          ADD USER
        </button>
      </div>

      <div className="the-list flex justify-center">
        <table rules="all">
          <tr className="flex flex-row items-center text-sm table-head">
            <th className="w-[142px] text-left pl-4">ID</th>
            <th className="w-[280px] text-left pl-4">EMAIL</th>
            <th className="w-[210px] text-left pl-4">NAME</th>
            <th className="w-[100px] text-left pl-4">ROLE</th>
            <th className="w-[130px] text-left justify-center">Action</th>
          </tr>

          <div>
            {data.map((x: any) => {
              return (
                <>
                  <tr className="flex flex-row items-center text-sm table-head">
                    <td className="w-[142px] text-left pl-4 publicAdd">
                      {sliceString(x._id, 12)}
                    </td>
                    <td className="w-[280px] text-left pl-4">{x.email}</td>
                    <td className="w-[210px] text-left pl-4">{x.name}</td>
                    <td className="w-[100px] text-left pl-4">{x.role.name}</td>

                    <td className="w-[130px] justify-around flex flex-row">
                      <button className="bg-blue-500 hover:bg-blue-400 px-2 py-1 rounded-md text-white">
                        EDIT
                      </button>
                      <button className="bg-red-500 hover:bg-red-400 px-2 py-1 rounded-md text-white">
                        DELETE
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </div>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
