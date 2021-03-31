import React from "react";
import express from "express";
import mongoose from "mongoose";
import { connect } from "react-redux";

const MongoDatabase = () => {
  const dbURI =
    "mongodb+srv://kurban:12397@cluster0.hxtev.mongodb.net/mongo-database?retryWrites=true&w=majority";
  };

  return (
    <div>
      <button className="ui button primary">
        Connect to MongoDB
      </button>
    </div>
  );
};

export default connect(() => {})(MongoDatabase);
