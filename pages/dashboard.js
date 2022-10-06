import { getCookie, removeCookies } from "cookies-next";
import Head from "next/head";
import React from "react";
import { Box, Button, Heading, HStack, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";

const Dashboard = () => {
  const [token, setToken] = useState();
  const [result, setResult] = useState([]);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/userData", fetcher);

  useEffect(() => {
    window.localStorage.setItem("access_token", data?.access_token);
    setToken(localStorage.getItem("access_token"));
  }, [data]);

  if (!data) return <Spinner />;
  const getListVideoYoutube = () => {
    axios
      .get(
        "https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=IQrk4J6wF9A",
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
            Accept: `application/json`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.items[0]);
        setResult(res.data.items[0]);
      });
  };

  const getCaptions = () => {
    axios
      .get(
        "https://youtube.googleapis.com/youtube/v3/captions/AUieDaZdpiZk6z7IjwcMFBZEL2Z1YlnQwWNLQgC_U6BOwYXUkyI",
        {
          headers: {
            Authorization: `Bearer ${content.access_token}`,
            Accept: `application/json`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Box border='1px solid red' w='50%' mt={5} display='block' mx='auto'>
        <Box p={5} textAlign='center'>
          <Heading>ACCESS TOKEN</Heading>
          <Text mt='5'>{token}</Text>
        </Box>
      </Box>
      <HStack mt='5' justifyContent='center'>
        <Button onClick={getListVideoYoutube}>Get List Video</Button>
        <Button onClick={getCaptions}>Get Captions</Button>
      </HStack>
      {result.id && (
        <Text mt='5' textAlign='center' key={result.etag}>
          Video id : {result?.id}
        </Text>
      )}
    </Box>
  );
};

export default Dashboard;
