
import EditProductForm from "@/components/EditProductFrom";

export default async function Page({ params }) {
    const { id } = await params;
    console.log('params', id)

    return (
        <EditProductForm id={id} />
    );
}
