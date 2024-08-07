"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { Send } from "./send";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { useDispatch} from 'react-redux';
import { setSubject, setText } from '../../store/emailSlice'
import { Input } from "../ui/input";

interface Attachment {
  name: string;
  file: File;
}

const MailForm: React.FC = () => {
  const dispatch = useDispatch();

  const [mailSubject, setMailSubject] = useState<string>("");
  const [mailText, setMailText] = useState<string>("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  useEffect(() => {
    dispatch(setSubject(mailSubject));
  }, [mailSubject]);

  useEffect(() => {
    dispatch(setText(mailText));
  }, [mailText]);


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).map((file) => ({
        name: file.name,
        file,
      }));
      setAttachments((prevAttachments) => [...prevAttachments, ...filesArray]);
    }
  };

  return (
    <div className="flex justify-center items-start w-full h-screen">
      <div className="flex flex-col items-center w-full max-h-[calc(100vh-60px)] overflow-auto">
        <div className="w-full max-w-[1440px] px-4 py-2">
          <Input
            className="mb-2"
            placeholder="Subject"
            value={mailSubject}
            onChange={(e) => setMailSubject(e.target.value)}
          />
          <Textarea
            placeholder="Write your mail here..."
            className="resize-none min-h-[calc(100vh-180px)]"
            value={mailText}
            onChange={(e) => setMailText(e.target.value)}
          />
          <div className="flex w-full py-2 justify-start items-center gap-8">
            <Send />
            <div className="flex justify-start items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                id="attachments-button"
                className="rounded-full size-8 text-gray-500"
                onClick={() => document.getElementById("attachments")?.click()}
              >
                <Plus />
              </Button>
              <Label
                htmlFor="attachments"
                className="text-gray-500 font-light text-xs hover:text-gray-700 hover:dark:text-gray-300 delay-75"
              >
                Add attachments
              </Label>
              <input
                id="attachments"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
          {attachments.length > 0 && (
            <div className="w-full px-2 py-5">
              <div className="pb-2">Attachments :</div>
              <ul className="list-decimal pl-5">
                {attachments.map((attachment, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {attachment.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MailForm;
