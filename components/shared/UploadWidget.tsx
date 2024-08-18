import React, { createContext, useEffect, useState } from "react";

// Define a type for Cloudinary upload widget configuration
interface CloudinaryConfig {
  multiple: boolean;
  cloudName: string;
  uploadPreset: string;
  folder: string;
}

interface UploadWidgetProps {
  uwConfig: CloudinaryConfig;
  setState: React.Dispatch<React.SetStateAction<string[]>>; // Ensure this is typed correctly
}

interface CloudinaryScriptContextProps {
  loaded: boolean;
}

const CloudinaryScriptContext = createContext<CloudinaryScriptContextProps>({
  loaded: false,
});

const UploadWidget: React.FC<UploadWidgetProps> = ({ uwConfig, setState }) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded && (window as any).cloudinary) {
      const myWidget = (window as any).cloudinary.createUploadWidget(
        uwConfig,
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setState((prev: string[]) => [...prev, result.info.secure_url]);
          }
        }
      );

      document.getElementById("upload_widget")?.addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          backgroundColor: "#cd2727",
          height: "54px",
          width: "150px",
          borderRadius: "27px",
          fontSize: "17px",
          fontWeight: "bold",
        }}
        id="upload_widget"
        onClick={initializeCloudinaryWidget}
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
};

export default UploadWidget;
export { CloudinaryScriptContext };
