import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

const image_hosting_token = import.meta.env.VITE_image_hosting;
const AddClass = () => {
      const { user } = useAuth();
      const [axiosSecure] = useAxiosSecure();
      const navigate = useNavigate();
      const { register, handleSubmit, reset } = useForm();
      const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

      const onSubmit = (data) => {
            const formData = new FormData();
            formData.append("image", data.image[0]);

            fetch(img_hosting_url, {
                  method: "POST",
                  body: formData,
            })
                  .then((res) => res.json())
                  .then((imgResponse) => {
                        if (imgResponse.success) {
                              const imgURL = imgResponse.data.display_url;
                              const { language, available, price } = data;
                              const newClass = {
                                    instructor: user?.displayName,
                                    email: user?.email,
                                    language,
                                    seat: 20,
                                    available: parseFloat(available),
                                    enroll: 0,
                                    price: parseFloat(price),
                                    image: imgURL,
                                    status: "pending",
                              };

                              axiosSecure
                                    .post("/classes", newClass)
                                    .then((data) => {
                                          if (data.data.insertedId) {
                                                reset();
                                                toast.success("Class Added Successfully");
                                                navigate('/dashboard/myClasses');
                                          }
                                    })
                                    .catch((error) => {
                                          toast.error(error.message);
                                    });
                        }
                  });
      };

      return (
            <div className="w-full min-h-full px-4">
                  <Helmet>
                        <title>Dream View | Add Class</title>
                  </Helmet>
                  <div className="rounded mt-10 md:mt-20 mb-4">
                        <div className="md:text-2xl uppercase text-center font-semibold">
                              <Fade delay={300} cascade damping={0.02}>
                                    Add your class!
                              </Fade>
                        </div>
                  </div>

                  <div className="p-10 bg-base-200 rounded">
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div className="form-control w-full">
                                          <label className="label">
                                                <span className="label-text font-semibold">Class Name*</span>
                                          </label>
                                          <input
                                                type="text"
                                                placeholder="Class Language"
                                                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#004A6B] bg-gray-200 text-gray-900"
                                                {...register("language", { required: true })}
                                          />
                                    </div>
                                    <div className="form-control w-full">
                                          <label className="label">
                                                <span className="label-text font-semibold">Select Image*</span>
                                          </label>
                                          <input
                                                required
                                                type="file"
                                                id="image"
                                                name="image"
                                                accept="image/*"
                                                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#004A6B] bg-gray-200 text-gray-900"
                                                {...register("image", { required: true })}
                                          />
                                    </div>
                                    <div className="form-control w-full">
                                          <label className="label">
                                                <span className="label-text font-semibold">Available seat*</span>
                                          </label>
                                          <input
                                                type="number"
                                                placeholder="Not more than 20"
                                                min="1"
                                                max="20"
                                                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#004A6B] bg-gray-200 text-gray-900"
                                                {...register("available", { required: true })}
                                          />
                                    </div>
                                    <div className="form-control w-full">
                                          <label className="label">
                                                <span className="label-text font-semibold">Price*</span>
                                          </label>
                                          <input
                                                type="number"
                                                placeholder="Reasonable price"
                                                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#004A6B] bg-gray-200 text-gray-900"
                                                {...register("price", { required: true })}
                                          />
                                    </div>
                              </div>
                              <div className="text-center">
                                    <input
                                          type="submit"
                                          value="Add Class"
                                          className="btn btn-wide btn-outline outline-[#004A6B] hover:bg-[#004A6B]"
                                    />
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default AddClass;
