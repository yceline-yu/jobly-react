import { useJwt } from "react-jwt";

function DecodeToken(token){
  const { decodedToken } = useJwt(token)
  return decodedToken;
}

export default DecodeToken;