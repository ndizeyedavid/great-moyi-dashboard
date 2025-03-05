// migration
import { useEffect } from "react"
import DatabaseService from "../services/databaseServices"
import AuthService from "../services/authService";
import { useForm } from "react-hook-form";
import FileService from "../services/fileService";

export default function Test() {

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        async function add() {
            const docs = await DatabaseService.listDocuments(import.meta.env.VITE_TEST_COLLECTION);

            console.log(docs);
        }

        async function login() {
            const email = "moyi@gmail.com";
            const password = "1234567890";

            const session = await AuthService.login(email, password);

            if (session) {
                console.log("Login successful:", session)
            } else {
                console.log("Login failed");
            }
        }

        // login()

        // add();
    }, [])

    async function logout() {
        const isLogout = await AuthService.logout()
        if (isLogout) {
            console.log("logged out")
        } else {
            console.log("unable to logout ")
        }
    }

    async function upload(data) {
        const bucketId = import.meta.env.VITE_IMAGES_BUCKET;
        // console.log(data.img[0])
        const uploadFile = await FileService.uploadFile(bucketId, data.img[0]);
        console.log("Uploaded files");
    }

    async function getFiles() {
        const bucketId = import.meta.env.VITE_IMAGES_BUCKET;
        const files = await FileService.listFiles(bucketId);
        console.log("Files:", files);
    }

    getFiles();

    return (
        <div>
            {/* <button onClick={logout}>Logout</button> */}
            <form onSubmit={handleSubmit(upload)}>
                <input type="file" {...register("img")} />
                <input type="submit" value="send" />
            </form>
        </div>
    )
}
