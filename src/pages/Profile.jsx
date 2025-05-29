import { useEffect, useState } from "react";
// import AdminLayout from "./AdminLayout";
import { PiDotsThree } from "react-icons/pi";
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
// import { updateMerchantInfo, updateMerchantPassword } from "../api/api";
import { toast } from "react-hot-toast";

const Profile = ({ merchantId }) => {
  const [data, setData] = useState({
    phones: [],
    email: '',
    state: '',
    district: '',
    social_media: {
      instagram: '',
    },
    created_at: '',
  });
  
  const [dropdown, setDropdown] = useState({ update: false });
  const [modal, setModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const passwordData = {
      old_password: oldPassword,
      new_password: newPassword,
    };

    try {
      const response = await updateMerchantPassword(merchantId, passwordData);
      console.log("Password updated:", response);
      const navigateTo = response.id;
      if (navigateTo) {
        navigate("/loginmerchant");
      }
      toast.error("Failed to change password. Please try again.");
    } catch (err) {
      toast.error("Failed to change password. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const toggleDropdown = (update) => {
    setDropdown((prevState) => ({
      ...prevState,
      [update]: !prevState[update],
    }));
  };

  useEffect(() => {
    const merchantData = JSON.parse(localStorage.getItem("merchantData"));
    console.log(merchantData);
    setData(merchantData);
  }, []);

  //MerchantInfoUpdate

  const [merchantInfo, setMerchantInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    store_name: "",
    descp: "",
    icon: "",
    banner: "",
    state: "",
    district: "",
    social_media: { x: "", face_book: "", instagram: "" },
    phones: [],
  });

  useEffect(() => {
    const currentInfo = JSON.parse(localStorage.getItem("merchantData"));
    console.log(currentInfo);
    setMerchantInfo(currentInfo || {}); // In case there's no stored data
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("social_media")) {
      const [field] = name.split("."); // Handling social media fields
      setMerchantInfo((prev) => ({
        ...prev,
        social_media: { ...prev.social_media, [field]: value },
      }));
    } else if (name === "phones") {
      // Handling phone numbers input
      setMerchantInfo((prev) => ({
        ...prev,
        phones: Array.isArray(value) ? value : value.split(",").map((num) => num.trim()),
      }));
    } else {
      setMerchantInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateMerchantInfo(merchantId, merchantInfo);
      console.log("Merchant info updated:", response);
      setMerchantInfo('')
      const updatedMerchantData = response;
      localStorage.setItem("merchantData", JSON.stringify(updatedMerchantData));
      console.log(updatedMerchantData);
      const navigateTo = response.icon;
      if (navigateTo === "") {
          toast.error("Failed to update merchant information. Empty fields.");
        } else {
            navigate("/loginmerchant");
        };
    } catch (err) {
      toast.error("Failed to update merchant information. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  const [updateMerchantModal, setMerchantUpdateModal] = useState(false);

  const openUpdateModal = () => {
    setMerchantUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setMerchantUpdateModal(false);
  };

  return (
      <div className="">
        <div className="bg-white p-4 shadow">
          <div className="flex gap-4 w-full overflow-hidden">
            <div className="p-4 rounded-full hidden md:block w-36 h-36">
              <img
                src=""
                alt="merchantimage"
                className="md:w-full md:rounded-full"
              />
            </div>
            <div className="flex flex-col w-[80%]">
              <p className="font-plus-jakarta-sans text-sm font-bold">
                Smookie
              </p>
              <p className="text-gray-600 font-sm font-plus-jakarta-sans">
                Merchant
              </p>
              <p className="text-gray-600 text-sm font-plus-jakarta-sans">
                Bestbuy
              </p>
              <div className="flex gap-5 my-3">
                <div className="flex flex-col justify-between items-center ">
                  <p className="font-bold font-plus-jakarta-sans">24</p>
                  <p className="text-gray-600 text-sm">Users</p>
                </div>
                <div className="flex flex-col justify-between items-center border-x border-gray-300 px-8">
                  <p className="font-bold font-plus-jakarta-sans">561</p>
                  <p className="text-gray-600 text-sm">Followers</p>
                </div>
                <div className="flex flex-col justify-between items-center ">
                  <p className="font-bold font-plus-jakarta-sans">4</p>
                  <p className="text-gray-600 text-sm">Products</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Strong leader and negotiator adept at driving collaboration and
                innovation. Highly accomplished CEO & Founder with 10+ years of
                experience creating, launching and leading successful business
                ventures. Proven ability to build relationships, drive customer
                loyalty and increase profitability.
              </p>
            </div>
            <div className="flex w-[20%] justify-end gap-4 relative">
              <PiDotsThree
                className="cursor-pointer mt-1 bg-orange-400 rounded-full text-white mx-1 text-xl font-extrabold"
                onClick={() => toggleDropdown("update")}
              />
              {dropdown.update && (
                <div className="bg-orange-100 flex flex-col p-4 text-[12px] w-36 absolute top-6 shadow-md rounded-md">
                  <header className="text-[14px] text-gray-600">
                    Merchant
                  </header>
                  <button
                    onClick={openUpdateModal}
                    className="font-bold font-plus-jakarta-sans text-gray-800 my-2"
                  >
                    Update Info
                  </button>
                  <button
                    onClick={openModal}
                    className="font-bold font-plus-jakarta-sans text-gray-800 my-2"
                  >
                    Update Password
                  </button>
                </div>
              )}
            </div>
            
          </div>
          {modal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
              <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 scale-95 hover:scale-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-plus-jakarta-sans font-semibold text-gray-800">
                    Change Password
                  </h2>
                  <TfiClose onClick={closeModal} className="cursor-pointer" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-2">
                  {/* Old Password */}
                  <div>
                    <label
                      htmlFor="oldPassword"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Old Password
                    </label>
                    <input
                      type="password"
                      id="oldPassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full p-2 my-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>

                  {/* New Password */}
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-600"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-2 my-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                  >
                    {loading ? "Changing..." : "Change Password"}
                  </button>
                </form>
              </div>
            </div>
          )}
          {updateMerchantModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
              <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-plus-jakarta-sans font-semibold text-gray-800">
                    Update Merchant Information
                  </h2>
                  <TfiClose
                    onClick={closeUpdateModal}
                    className="cursor-pointer"
                  />
                </div>

                <form onSubmit={handleUpdateSubmit} className="space-y-2">
                  <div className="flex justify-between items-center gap-4">
                    <div className="w-full">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-gray-600"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={merchantInfo.first_name}
                        onChange={handleInputChange}
                        className="w-full py-1 px-2 my-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={merchantInfo.last_name}
                        onChange={handleInputChange}
                        className="w-full py-1 px-2 my-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <div className="w-full">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={merchantInfo.email}
                        onChange={handleInputChange}
                        className="w-full py-1 px-2 my-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="phones"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Phones
                      </label>
                      <input
                        type="text"
                        id="phones"
                        name="phones"
                        value={Array.isArray(merchantInfo.phones) ? merchantInfo.phones.join(", ") : ""}
                        onChange={handleInputChange}
                        className="w-full py-1 px-2 outline-none my-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter multiple phone numbers separated by commas"
                      />
                    </div>
                  </div>

                  {/* Social Media Fields */}
                  <div className="space-y-2">
                    <label
                      htmlFor="social_media"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Social Media
                    </label>
                    <div className="flex justify-between items-center gap-4">
                      <div className="w-full">
                        <label
                          htmlFor="social_media.x"
                          className="block text-sm font-medium text-gray-600"
                        >
                          X thread
                        </label>
                        <input
                          type="text"
                          id="social_media.x"
                          name="social_media.x"
                          value={merchantInfo.social_media?.x || ""}
                          onChange={handleInputChange}
                          className="w-full py-1 px-2 outline-none my-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="social_media.face_book"
                          className="block text-sm font-medium text-gray-600"
                        >
                          Facebook
                        </label>
                        <input
                          type="text"
                          id="social_media.face_book"
                          name="social_media.face_book"
                          value={merchantInfo.social_media?.face_book || ''}
                          onChange={handleInputChange}
                          className="w-full py-1 px-2 outline-none my-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="social_media.instagram"
                          className="block text-sm font-medium text-gray-600"
                        >
                          Instagram
                        </label>
                        <input
                          type="text"
                          id="social_media.instagram"
                          name="social_media.instagram"
                          value={merchantInfo.social_media?.instagram || ''}
                          onChange={handleInputChange}
                          className="w-full py-1 px-2 outline-none my-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <div className="w-full">
                      <label
                        htmlFor="district"
                        className="block text-sm font-medium text-gray-600"
                      >
                        District
                      </label>
                      <input
                        type="text"
                        id="district"
                        name="district"
                        value={merchantInfo.district}
                        onChange={handleInputChange}
                        className="w-full py-1 px-2 outline-none my-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-600"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={merchantInfo.state}
                        onChange={handleInputChange}
                        className="w-full py-1 px-2 outline-none my-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <div className="w-full">
                      <label
                        htmlFor="store_name"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Store Name
                      </label>
                      <input
                        type="text"
                        id="store_name"
                        name="store_name"
                        value={merchantInfo.store_name}
                        onChange={handleInputChange}
                        className="w-full py-1 px-2 outline-none my-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="descp"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Description
                      </label>
                      <input
                        id="descp"
                        name="descp"
                        value={merchantInfo.descp}
                        onChange={handleInputChange}
                        className="w-full py-1 px-2 outline-none my-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pb-4">
                    <div>
                      <label
                        htmlFor="icon"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Icon
                      </label>
                      <input
                        type="text"
                        name="icon"
                        value={merchantInfo.icon}
                        onChange={handleInputChange}
                        placeholder="Icon URL"
                        className="w-full p-2 placeholder:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="banner"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Banner
                      </label>
                      <input
                        type="text"
                        name="banner"
                        value={merchantInfo.banner}
                        onChange={handleInputChange}
                        placeholder="Banner URL"
                        className="w-full p-2 placeholder:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      />
                    </div>
                  </div>

                  {/* Preview Section (Conditional Rendering) */}
                  {merchantInfo.icon && merchantInfo.banner && (
                    <div className="mt-6 flex gap-8 justify-between">
                      <div className="text-center">
                        <p className="font-semibold text-gray-800">
                          Icon Preview
                        </p>
                        <img
                          src={merchantInfo.icon}
                          alt="Icon Preview"
                          className="w-40 h-40 rounded-full object-cover mt-2 shadow-md"
                        />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-800">
                          Banner Preview
                        </p>
                        <img
                          src={merchantInfo.banner}
                          alt="Banner Preview"
                          className="w-40 h-40 rounded-full object-cover mt-2 shadow-md"
                        />
                      </div>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                  >
                    {loading ? "Updating..." : "Update Information"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 my-5 rounded-md">
            <header className="text-[13px] font-plus-jakarta-sans font-bold">
              Personal Information
            </header>
            <div className="flex flex-col justify-between">
              <div className="flex justify-between items-center my-2">
                <p className="text-sm font-bold font-plus-jakarta-sans">
                  Designation
                </p>
                <p className="text-sm font-plus-jakarta-sans text-gray-600">
                  CEO & Merchant
                </p>
              </div>
              <div className="flex justify-between items-center my-2">
                <p className="text-sm font-bold font-plus-jakarta-sans">
                  Phone No
                </p>
                <p className="text-sm font-plus-jakarta-sans text-gray-600">
                  {/* {Array.isArray(data.phones) && data.phones.length > 0 ? data.phones[0] : 'No phone available'} */} No phone available
                </p>
              </div>
              <div className="flex justify-between items-center my-2">
                <p className="text-sm font-bold font-plus-jakarta-sans">
                  Email
                </p>
                <p className="text-sm font-plus-jakarta-sans text-gray-600">
                  {/* {data.email} */} No phone available
                </p>
              </div>
              <div className="flex justify-between items-center my-2">
                <p className="text-sm font-bold font-plus-jakarta-sans">
                  State
                </p>
                <p className="text-sm font-plus-jakarta-sans text-gray-600">
                  {/* {data.state} */} No phone available
                </p>
              </div>
              <div className="flex justify-between items-center my-2">
                <p className="text-sm font-bold font-plus-jakarta-sans">
                  District
                </p>
                <p className="text-sm font-plus-jakarta-sans text-gray-600">
                  {/* {data.district} */} No phone available
                </p>
              </div>
              <div className="flex justify-between items-center my-2">
                <p className="text-sm font-bold font-plus-jakarta-sans">
                  Socials
                </p>
                <p className="text-sm font-plus-jakarta-sans text-gray-600">
                  {/* {data.social_media.instagram} */} No phone available
                </p>
              </div>
              <div className="flex justify-between items-center my-2">
                <p className="text-sm font-bold font-plus-jakarta-sans">
                  Joined Date
                </p>
                <p className="text-sm font-plus-jakarta-sans text-gray-600">
                  {/* {new Date(data.created_at).toDateString()} */} No phone available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Profile;
