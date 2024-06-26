import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ButtonWithTheme from "components/Button";
import InputWithTheme from "components/Input";
import LabelWithTheme from "components/Label";
import PostcodeWithLayer from "components/Postcode";
import { PLACETYPES, Place } from "libs/place/domain";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import SelectWithTheme from "components/Select";
import TextareaWithTheme from "components/Textarea";
import { useCreatePlace } from "libs/place/usecase/createPlace";
import { toast } from "react-toastify";

import useGlobalContext from "components/GlobalContext";

export const Route = createFileRoute("/create")({
  component: Index,
});
function Index() {
  const notify = () => toast("작성이 완료됐어요");
  const { mutateAsync } = useCreatePlace();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<Place>();
  const { setIsLoading } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const onSubmit = async (values: Place) => {
    setIsLoading(true);
    await mutateAsync(values);
    navigate({ to: "/" });
    notify();
    setIsLoading(false);
  };
  const handleClose = (address: unknown) => {
    address && setValue("address", `${address}`);
    setIsOpen(false);
    trigger("address");
  };
  const address = watch("address");
  const handleReset = () => {
    setValue("address", "");
    trigger("address");
  };
  register("address", { required: "필수입력입니다." });
  return (
    <div className="p-2">
      <h1 className="text-xl">얼웨이즈 추가</h1>
      <PostcodeWithLayer isOpen={isOpen} onClose={handleClose} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <LabelWithTheme
          container={
            <div className="relative">
              <motion.div
                className="opacity-0"
                animate={{
                  opacity: address ? 1 : 0,
                  translateX: address ? 0 : "100%",
                }}
              >
                <InputWithTheme
                  onClear={handleReset}
                  disabled
                  readOnly
                  value={address}
                />
              </motion.div>
              <motion.div
                className="top-0 left-0 absolute w-full"
                animate={{
                  opacity: address ? 0 : 1,
                  translateX: address ? "-100%" : 0,
                }}
              >
                <ButtonWithTheme type="button" onClick={() => setIsOpen(true)}>
                  주소입력
                </ButtonWithTheme>
              </motion.div>
            </div>
          }
        >
          주소
        </LabelWithTheme>
        <p className="before:content-['-'] empty:hidden text-red-600">
          {errors.address?.message}
        </p>
        <br />
        <LabelWithTheme
          container={
            <InputWithTheme
              placeholder="가게 이름을 적어주세요."
              {...register("name", { required: "필수입력입니다." })}
            />
          }
        >
          이름
        </LabelWithTheme>
        <p className="before:content-['-'] empty:hidden text-red-600">
          {errors.name?.message}
        </p>
        <br />
        <LabelWithTheme
          container={
            <SelectWithTheme
              {...register("type", { required: "필수입력입니다." })}
            >
              <option value="">업종선택</option>
              {PLACETYPES.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </SelectWithTheme>
          }
        >
          업종
        </LabelWithTheme>
        <p className="before:content-['-'] empty:hidden text-red-600">
          {errors.type?.message}
        </p>
        <br />
        <LabelWithTheme
          container={
            <InputWithTheme
              placeholder="https://"
              {...register("url", {
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                  message: "올바른 주소인지 확인해주세요",
                },
              })}
            />
          }
        >
          홈페이지
        </LabelWithTheme>
        <p className="before:content-['-'] empty:hidden text-red-600">
          {errors.url?.message}
        </p>
        <br />
        <LabelWithTheme
          container={<TextareaWithTheme {...register("description")} />}
        >
          상세설명
        </LabelWithTheme>
        <p className="before:content-['-'] empty:hidden text-red-600">
          {errors.description?.message}
        </p>
        <br />
        <ButtonWithTheme className="mt-10">작성</ButtonWithTheme>
        {/* <div className="flex items-center gap-1">
          <ButtonWithTheme size="sm">작성</ButtonWithTheme>
          <ButtonWithTheme size="xl">작성</ButtonWithTheme>
        </div> */}
      </form>
    </div>
  );
}
