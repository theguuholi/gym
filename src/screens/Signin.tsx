import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import Input from "@components/input";
import Button from "@components/Button";
export default function SignIn() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} bg="gray.700" pb={16}>
        <Image
          source={BackgroundImg}
          alt="Background"
          resizeMode="contain"
          position="absolute"
        />
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <Input
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="E-mail"
          />
          <Input secureTextEntry placeholder="Senha" />
          <Button title="Acessar" />
        </Center>

        <Center mt={24}>
          <Text
            color="gray.100"
            textAlign="center"
            fontSize="sm"
            mb="3"
            fontFamily="body"
          >
            Ainda nao tem acesso?
          </Text>
          <Button title="Criar Conta" variant="outline" />
        </Center>
      </VStack>
    </ScrollView>
  );
}
