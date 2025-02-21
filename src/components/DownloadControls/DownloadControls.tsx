import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { useDispatch, useSelector } from 'react-redux';
import { deselectAllPokemons } from '../../redux/pokemonReducer';
import { AppState } from '../../redux/store';
import './DownloadControls.css';

const DownloadControls = () => {
  const dispatch = useDispatch();
  const selectedPokemons = useSelector(
    (state: AppState) => state.pokemon.selectedPokemons
  );

  const handleDownload = () => {
    const csvString = Papa.unparse(selectedPokemons);
    const fileName = `${selectedPokemons.length}_pokemons.csv`;
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, fileName);
  };

  return (
    <div className="download-controls fly-in">
      <span>{selectedPokemons.length} pokemon(s) selected</span>
      <div className="download-controls__btn-group">
        <button
          onClick={() => dispatch(deselectAllPokemons())}
          className="download-controls__btn"
        >
          Unselect all
        </button>
        <button onClick={handleDownload} className="download-controls__btn">
          Download
        </button>
      </div>
    </div>
  );
};

export default DownloadControls;
