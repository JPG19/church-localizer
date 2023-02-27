import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
// import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { supabase } from "../../lib/helper/supabaseClient";

const Login = () => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // @ts-ignore
	// 	const session: any = supabase.auth.session();
	// 	setUser(session?.user);
	// 	const { data: authListener } = supabase.auth.onAuthStateChange(
	// 		(event, session) => {
	// 			switch (event) {
	// 				case "SIGNED_IN":
  //           // @ts-ignore
	// 					setUser(session?.user);
	// 					break;
	// 				case "SIGNED_OUT":
	// 					setUser(null);
	// 					break;
	// 				default:
	// 			}
	// 		}
	// 	);
	// 	return () => {
  //     // @ts-ignore
	// 		authListener.unsubscribe();
	// 	};
	// }, []);

	const login = async () => {
    // @ts-ignore
		await supabase.auth.signIn({
			provider: "github",
		});
	};
	const logout = async () => {
		await supabase.auth.signOut();
	};

  return (
    <div className='container' style={{ padding: '50px 0 100px 0' }}>
      <Auth
        providers={['github']}
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme='dark'
      />
    </div>
  );
};

export default Login;
