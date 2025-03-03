import App from 'App';
import NavigateRootOnClickOurside from 'components/NavigateRootOnClickOurside/NavigateRootOnClickOurside';
import PokemonDetails from 'components/PokemonDetails/PokemonDetails';

export default function DetailsPage() {
  return (
    <App>
      <NavigateRootOnClickOurside>
        <PokemonDetails />
      </NavigateRootOnClickOurside>
    </App>
  );
}
