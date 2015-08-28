export class MainForm extends Component {
    constructor(props) {
        super(props);
        this.gameStore = this.props.resolved.gameStore;
        this.bound(this.gameStore);
    }

    static resolve() {
        return new GameStore().listenSocket().then(store => ({gameStore: store}));
    }

    state = {filterDate: null, filterLeague: null};
    days = [];

    changeDate(date) {
        this.setState({filterDate: date});
    }

    leagueFilter() {
        return this.state.filterDate && this.state.filterDate.getTime() ? [this.state.filterDate] : this.days;
    }

    setLeague(league) {
        this.setState({filterLeague: league});
    }

    dayGames;
    liveGames;

    filterGames() {
        this.dayGames = {};
        this.liveGames = [];
        this.gameStore.forEach(game => {
            if (this.state.filterLeague && game.league !== this.state.filterLeague) {
                return;
            }
            if (game.isLive) {
                this.liveGames.push(game);
            }
            else {
                if (this.state.filterDate && this.state.filterDate.getTime()
                    && this.state.filterDate.getDayInt() !== game.date.getDayInt()) {
                    return;
                }
                let dayInt = game.date.getDayInt();
                this.dayGames[dayInt] = this.dayGames[dayInt] || {day: game.date, games: []};
                this.dayGames[dayInt].games.push(game);
            }
        });

    }

    render() {
        this.filterGames();
        return <div className="main-page">
            <div className="main-page__block">
                <div className="filters">
                    <RadioButtons
                        active={this.state.filterLeague}
                        items={storage.leagues}
                        onChange={(league)=>this.setLeague(league)}
                        itemKey={item=>item.id}
                        label={league=> league.abbreviation}
                        empty="ALL"/>
                </div>
                <h2>Live</h2>
            </div>
            <GrouppedGameList games={this.liveGames} component={GameItem}/>

            <div className="main-page__block / main-page__upcoming-block">
                <div className="main-page__upcoming-block--left">
                    <h2>Upcoming</h2>
                </div>
                <div className="main-page__upcoming-block--right">
                    <input className="input date" onInput={(e)=>this.changeDate(new Date(e.target.value))}
                           type="date" placeholder="dd.mm.yyyy"/>
                </div>
            </div>

            {Object.keys(this.dayGames).map(dayInt =>
                this.dayGames[dayInt].games.length > 0 &&
                <div key={dayInt}>
                    <div className="main-page__block">
                        <h3>{formatDate(this.dayGames[dayInt].day)}</h3>
                    </div>
                    <GrouppedGameList games={this.dayGames[dayInt].games} component={GameItem}/>
                </div>
            )}
        </div>;
    }
}
