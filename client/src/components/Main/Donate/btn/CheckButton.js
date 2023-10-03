import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../../../utils/queries";

function CheckoutButton() {

    const [startCheckout, { loading, error, data }] = useLazyQuery(QUERY_CHECKOUT, {
        onCompleted: (queryData) => {
            console.log(queryData);
            let data = JSON.parse(queryData.createCheckoutSession);
            console.log(data);
            let checkoutUrl = data.url;
            window.location.assign(checkoutUrl);
        }
    });

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) return `Error! ${error.message}`;
    console.log(data);


    return (
        <div>
            <button onClick={startCheckout}>Click Here To Donate!</button>
        </div>
    );
}

export default CheckoutButton;