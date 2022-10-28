import { Button, Center, Link, Text } from "@chakra-ui/react";

import { FcGoogle } from "react-icons/fc";

export default function Home() {
  return (
    <Center p={8}>
      <Link href='/api/google'>
        <Button
          w={"full"}
          maxW={"md"}
          variant={"outline"}
          leftIcon={<FcGoogle />}>
          <Center>
            <Text>YOUTION</Text>
          </Center>
        </Button>
      </Link>
    </Center>
  );
}
