import React, { useEffect, useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import H6 from '../../components/H6';
import {
  fetchTournamentBegin,
  fetchTournamentFailure,
  fetchTournamentSuccess,
} from '../../store/Tournamnet.action';
import * as crudService from '../../service/CrudService';
import { useDispatch, useSelector } from 'react-redux';
import ITournament from '../../interface/TournamnetInterface';
import H4 from '../../components/H4';
import { Link } from 'react-router-dom';

function Tournament() {
  const dispatch = useDispatch();
  const [filteredtournaments, setFilteredTournaments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { tournaments } = useSelector((state: any) => ({
    tournaments: state.tournaments.tournaments,
  }));

  useEffect(() => {
    fetchTournaments();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  /**
   * converts date into `DD/MM/YYYY, HH:mm:ss` format.
   * @param startDate date | string.
   * @returns
   */
  const convertStartDate = (startDate: Date | string) => {
    var date = new Date(startDate);
    var dateStr =
      ('00' + (date.getMonth() + 1)).slice(-2) +
      '/' +
      ('00' + date.getDate()).slice(-2) +
      '/' +
      date.getFullYear() +
      ' ' +
      ('00' + date.getHours()).slice(-2) +
      ':' +
      ('00' + date.getMinutes()).slice(-2) +
      ':' +
      ('00' + date.getSeconds()).slice(-2);

    return dateStr;
  };

  const dynamicTournamentsCards = filteredtournaments?.map(
    (tournament: ITournament, i: number) => {
      return (
        <Col lg="4" key={i}>
          <div
            style={{
              background: '#1F1F1F',
              color: '#fff',
              borderRadius: '4px',
              width: '100%',
              padding: '15px',
              marginTop: '24px',
              marginRight: '24px',
            }}
          >
            <H6>{tournament?.name}</H6>
            <div>
              <span>Organizer : {tournament?.organizer}</span>
              <br></br>
              <span>Game : {tournament?.game}</span>
              <br></br>
              <span>
                Participants :{' '}
                {tournament?.participants?.current /
                  tournament?.participants?.max}
              </span>
              <br></br>
              <span>Start : {convertStartDate(tournament.startDate)}</span>
              <br></br>
            </div>

            <Button
              style={{ margin: '10px', marginLeft: 0 }}
              onClick={() => {
                handleEditTournament(tournament);
              }}
            >
              EDIT
            </Button>
            <Button
              style={{ margin: '10px', marginLeft: 0 }}
              onClick={() => {
                handleDeleteTournament(tournament.id);
              }}
            >
              DELETE
            </Button>
          </div>
        </Col>
      );
    }
  );

  /**
   * dispatches action to get Tournaments from store.
   * @returns
   */
  const fetchTournaments = () => {
    dispatch(fetchTournamentBegin());
    return crudService
      .getAllTournaments()
      .then((tournaments) => {
        dispatch(fetchTournamentSuccess(tournaments));
        setFilteredTournaments(tournaments);
        setIsLoading(false);
      })
      .catch((error) => dispatch(fetchTournamentFailure(error)));
  };

  /**
   * creates new Tournament.
   */
  const handleCreateTournament = async () => {
    const tournamentName = window.prompt('Enter Tournament Name');
    const response = await crudService.addTournament(tournamentName);
    if (response.id) {
      tournaments.push(response);
      setFilteredTournaments(tournaments);
    }
  };

  /**
   * Edits and Updates Tournament Name.
   * @param tournamentName
   */
  const handleEditTournament = async (tournament: ITournament) => {
    const templateName = window.prompt('New Tournament Name', tournament.name);
    if (templateName) {
      tournament.name = templateName;
      const response = await crudService.updateTournament(
        tournament.id,
        tournament
      );
      if (response) {
        const index = tournaments.findIndex(
          (item: ITournament) => item.id == response.id
        );
        if (index > -1) {
          tournaments[index] = response;
          setFilteredTournaments(tournaments);
        }
      }
    }
  };

  /**
   * deletes tournament on basis of tournamentId.
   * @param tournamentId
   */
  const handleDeleteTournament = async (tournamentId: string) => {
    const isPermitted = window.confirm(
      'Do you really want to delete this tournament.'
    );
    if (isPermitted) {
      const response = await crudService.deleteTournament(tournamentId);
      if (response) {
        const index = tournaments.findIndex(
          (item: ITournament) => item.id == tournamentId
        );
        if (index > -1) {
          tournaments.splice(index, 1);
          setFilteredTournaments(tournaments);
        }
      }
    }
  };

  /**
   * This function is used to filter the tournaments based on name.
   */
  const handleSearch = async () => {
    try {
      const response = await crudService.getTournamentsBySearch(searchTerm);
      if (response) {
        setFilteredTournaments(response);
      }
    } catch (error) {
      if (error) {
        console.log(error, 'error');
      }
    }
  };

  return (
    <>
      <Container>
        <H4 style={{ paddingLeft: '15px' }}>FACEIT Tournaments</H4>
        <Container fluid>
          <Row>
            <Col>
              <Input
                type="search"
                placeholder="...search tournament"
                onChange={(e) => setSearchTerm(e.target.value)}
              ></Input>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <Button
                onClick={() => {
                  handleCreateTournament();
                }}
              >
                CREATE TOURNAMENT{' '}
              </Button>
            </Col>
          </Row>

          {!filteredtournaments.length ? (
            <Row style={{ justifyContent: 'center' }}>
              {' No Tournament Found. '}{' '}
            </Row>
          ) : (
            <Row>
              {!isLoading ? dynamicTournamentsCards : '...Loading Tournamnets'}
            </Row>
          )}
        </Container>
      </Container>
    </>
  );
}

export default Tournament;
