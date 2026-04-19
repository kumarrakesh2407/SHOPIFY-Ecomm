package com.ecm.ecomm.dto;

public class OrderItemDTO {

    private String productName;

    private int quantity;

    private double productprice;

    public OrderItemDTO(String productName, int quantity, double productprice) {
        this.productName = productName;
        this.quantity = quantity;
        this.productprice = productprice;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getProductprice() {
        return productprice;
    }

    public void setProductprice(double productprice) {
        this.productprice = productprice;
    }
}
