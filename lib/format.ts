export const format = (value: number) => {
    let currency = new Intl.NumberFormat("en-US",{
        style: "currency",
        currency:"INR"
    }).format(value);

    return currency;
}