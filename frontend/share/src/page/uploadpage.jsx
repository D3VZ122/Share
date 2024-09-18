import Fileupload from "../component/Fileupload";

export default function Upload() {
    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-300">
                <div className="w-full max-w-3xl border border-gray-300 rounded-lg shadow-lg bg-black text-white">
                    <div className="grid grid-cols-1 ">
                        <div className="col-span-1 flex items-center justify-center p-4 border-r border-gray-700">
                            <Fileupload />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
