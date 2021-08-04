function decodeBase64(base64, enableUnicode) {
    var binaryString = atob(base64);
    if (enableUnicode) {
        var binaryView = new Uint8Array(binaryString.length);
        for (var i = 0, n = binaryString.length; i < n; ++i) {
            binaryView[i] = binaryString.charCodeAt(i);
        }
        return String.fromCharCode.apply(null, new Uint16Array(binaryView.buffer));
    }
    return binaryString;
}

function createURL(base64, sourcemapArg, enableUnicodeArg) {
    var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
    var enableUnicode = enableUnicodeArg === undefined ? false : enableUnicodeArg;
    var source = decodeBase64(base64, enableUnicode);
    var start = source.indexOf('\n', 10) + 1;
    var body = source.substring(start) + (sourcemap ? '\/\/# sourceMappingURL=' + sourcemap : '');
    var blob = new Blob([body], { type: 'application/javascript' });
    return URL.createObjectURL(blob);
}

function createBase64WorkerFactory(base64, sourcemapArg, enableUnicodeArg) {
    var url;
    return function WorkerFactory(options) {
        url = url || createURL(base64, sourcemapArg, enableUnicodeArg);
        return new Worker(url, options);
    };
}

var WorkerFactory = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwohZnVuY3Rpb24oKXsidXNlIHN0cmljdCI7bGV0IHQ9MzczNTkyODU1OTtjbGFzcyBle2NvbnN0cnVjdG9yKHQse2luaXRpYWxPZmZzZXQ6ZT00LHVzZUF0b21pY3M6aT0hMCxzdHJlYW06cz0hMCxkZWJ1ZzpyLG5hbWU6bn09e30pe3RoaXMuYnVmZmVyPXQsdGhpcy5hdG9taWNWaWV3PW5ldyBJbnQzMkFycmF5KHQpLHRoaXMub2Zmc2V0PWUsdGhpcy51c2VBdG9taWNzPWksdGhpcy5zdHJlYW09cyx0aGlzLmRlYnVnPXIsdGhpcy5uYW1lPW59bG9nKC4uLnQpe3RoaXMuZGVidWcmJmNvbnNvbGUubG9nKGBbcmVhZGVyOiAke3RoaXMubmFtZX1dYCwuLi50KX13YWl0V3JpdGUodCl7aWYodGhpcy51c2VBdG9taWNzKXtmb3IodGhpcy5sb2coYHdhaXRpbmcgZm9yICR7dH1gKTswPT09QXRvbWljcy5sb2FkKHRoaXMuYXRvbWljVmlldywwKTspQXRvbWljcy53YWl0KHRoaXMuYXRvbWljVmlldywwLDAsNTAwKTt0aGlzLmxvZyhgcmVzdW1lZCBmb3IgJHt0fWApfWVsc2UgaWYoMSE9PXRoaXMuYXRvbWljVmlld1swXSl0aHJvdyBuZXcgRXJyb3IoImB3YWl0V3JpdGVgIGV4cGVjdGVkIGFycmF5IHRvIGJlIHJlYWRhYmxlIil9ZmxpcCgpe2lmKHRoaXMubG9nKCJmbGlwIiksdGhpcy51c2VBdG9taWNzKXtpZigxIT09QXRvbWljcy5jb21wYXJlRXhjaGFuZ2UodGhpcy5hdG9taWNWaWV3LDAsMSwwKSl0aHJvdyBuZXcgRXJyb3IoIlJlYWQgZGF0YSBvdXQgb2Ygc3luYyEgVGhpcyBpcyBkaXNhc3Ryb3VzIik7QXRvbWljcy5ub3RpZnkodGhpcy5hdG9taWNWaWV3LDApfWVsc2UgdGhpcy5hdG9taWNWaWV3WzBdPTA7dGhpcy5vZmZzZXQ9NH1kb25lKCl7dGhpcy53YWl0V3JpdGUoImRvbmUiKTtsZXQgZT1uZXcgRGF0YVZpZXcodGhpcy5idWZmZXIsdGhpcy5vZmZzZXQpLmdldFVpbnQzMigwKT09PXQ7cmV0dXJuIGUmJih0aGlzLmxvZygiZG9uZSIpLHRoaXMuZmxpcCgpKSxlfXBlZWsodCl7dGhpcy5wZWVrT2Zmc2V0PXRoaXMub2Zmc2V0O2xldCBlPXQoKTtyZXR1cm4gdGhpcy5vZmZzZXQ9dGhpcy5wZWVrT2Zmc2V0LHRoaXMucGVla09mZnNldD1udWxsLGV9c3RyaW5nKCl7dGhpcy53YWl0V3JpdGUoInN0cmluZyIpO2xldCB0PXRoaXMuX2ludDMyKCksZT10LzIsaT1uZXcgRGF0YVZpZXcodGhpcy5idWZmZXIsdGhpcy5vZmZzZXQsdCkscz1bXTtmb3IobGV0IHQ9MDt0PGU7dCsrKXMucHVzaChpLmdldFVpbnQxNigyKnQpKTtsZXQgcj1TdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwscyk7cmV0dXJuIHRoaXMubG9nKCJzdHJpbmciLHIpLHRoaXMub2Zmc2V0Kz10LG51bGw9PXRoaXMucGVla09mZnNldCYmdGhpcy5mbGlwKCkscn1faW50MzIoKXtsZXQgdD1uZXcgRGF0YVZpZXcodGhpcy5idWZmZXIsdGhpcy5vZmZzZXQpLmdldEludDMyKCk7cmV0dXJuIHRoaXMubG9nKCJfaW50MzIiLHQpLHRoaXMub2Zmc2V0Kz00LHR9aW50MzIoKXt0aGlzLndhaXRXcml0ZSgiaW50MzIiKTtsZXQgdD10aGlzLl9pbnQzMigpO3JldHVybiB0aGlzLmxvZygiaW50MzIiLHQpLG51bGw9PXRoaXMucGVla09mZnNldCYmdGhpcy5mbGlwKCksdH1ieXRlcygpe3RoaXMud2FpdFdyaXRlKCJieXRlcyIpO2xldCB0PXRoaXMuX2ludDMyKCksZT1uZXcgQXJyYXlCdWZmZXIodCk7cmV0dXJuIG5ldyBVaW50OEFycmF5KGUpLnNldChuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlcix0aGlzLm9mZnNldCx0KSksdGhpcy5sb2coImJ5dGVzIixlKSx0aGlzLm9mZnNldCs9dCxudWxsPT10aGlzLnBlZWtPZmZzZXQmJnRoaXMuZmxpcCgpLGV9fWNsYXNzIGl7Y29uc3RydWN0b3IodCx7aW5pdGlhbE9mZnNldDplPTQsdXNlQXRvbWljczppPSEwLHN0cmVhbTpzPSEwLGRlYnVnOnIsbmFtZTpufT17fSl7dGhpcy5idWZmZXI9dCx0aGlzLmF0b21pY1ZpZXc9bmV3IEludDMyQXJyYXkodCksdGhpcy5vZmZzZXQ9ZSx0aGlzLnVzZUF0b21pY3M9aSx0aGlzLnN0cmVhbT1zLHRoaXMuZGVidWc9cix0aGlzLm5hbWU9bix0aGlzLnVzZUF0b21pY3M/QXRvbWljcy5zdG9yZSh0aGlzLmF0b21pY1ZpZXcsMCwwKTp0aGlzLmF0b21pY1ZpZXdbMF09MH1sb2coLi4udCl7dGhpcy5kZWJ1ZyYmY29uc29sZS5sb2coYFt3cml0ZXI6ICR7dGhpcy5uYW1lfV1gLC4uLnQpfXdhaXRSZWFkKHQpe2lmKHRoaXMudXNlQXRvbWljcyl7aWYodGhpcy5sb2coYHdhaXRpbmcgZm9yICR7dH1gKSwwIT09QXRvbWljcy5jb21wYXJlRXhjaGFuZ2UodGhpcy5hdG9taWNWaWV3LDAsMCwxKSl0aHJvdyBuZXcgRXJyb3IoIldyb3RlIHNvbWV0aGluZyBpbnRvIHVud3JpdGFibGUgYnVmZmVyISBUaGlzIGlzIGRpc2FzdHJvdXMiKTtmb3IoQXRvbWljcy5ub3RpZnkodGhpcy5hdG9taWNWaWV3LDApOzE9PT1BdG9taWNzLmxvYWQodGhpcy5hdG9taWNWaWV3LDApOylBdG9taWNzLndhaXQodGhpcy5hdG9taWNWaWV3LDAsMSw1MDApO3RoaXMubG9nKGByZXN1bWVkIGZvciAke3R9YCl9ZWxzZSB0aGlzLmF0b21pY1ZpZXdbMF09MTt0aGlzLm9mZnNldD00fWZpbmFsaXplKCl7dGhpcy5sb2coImZpbmFsaXppbmciKSxuZXcgRGF0YVZpZXcodGhpcy5idWZmZXIsdGhpcy5vZmZzZXQpLnNldFVpbnQzMigwLHQpLHRoaXMud2FpdFJlYWQoImZpbmFsaXplIil9c3RyaW5nKHQpe3RoaXMubG9nKCJzdHJpbmciLHQpO2xldCBlPTIqdC5sZW5ndGg7dGhpcy5faW50MzIoZSk7bGV0IGk9bmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyLHRoaXMub2Zmc2V0LGUpO2ZvcihsZXQgZT0wO2U8dC5sZW5ndGg7ZSsrKWkuc2V0VWludDE2KDIqZSx0LmNoYXJDb2RlQXQoZSkpO3RoaXMub2Zmc2V0Kz1lLHRoaXMud2FpdFJlYWQoInN0cmluZyIpfV9pbnQzMih0KXtuZXcgRGF0YVZpZXcodGhpcy5idWZmZXIsdGhpcy5vZmZzZXQpLnNldEludDMyKDAsdCksdGhpcy5vZmZzZXQrPTR9aW50MzIodCl7dGhpcy5sb2coImludDMyIix0KSx0aGlzLl9pbnQzMih0KSx0aGlzLndhaXRSZWFkKCJpbnQzMiIpfWJ5dGVzKHQpe3RoaXMubG9nKCJieXRlcyIsdCk7bGV0IGU9dC5ieXRlTGVuZ3RoO3RoaXMuX2ludDMyKGUpLG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyLHRoaXMub2Zmc2V0KS5zZXQobmV3IFVpbnQ4QXJyYXkodCkpLHRoaXMub2Zmc2V0Kz1lLHRoaXMud2FpdFJlYWQoImJ5dGVzIil9fWxldCBzLHI9e30sbj17fTthc3luYyBmdW5jdGlvbiBhKHQsZSxpKXtnbG9iYWxUaGlzLnBvc3RNZXNzYWdlKHt0eXBlOiJfX3BlcmYtZGVldHM6bG9nLXBlcmYiLGRhdGFUeXBlOnQsbmFtZTplLGRhdGE6aSxhcGlWZXJzaW9uOjF9KX1mdW5jdGlvbiBvKCl7Z2xvYmFsVGhpcy5wb3N0TWVzc2FnZSh7dHlwZToiX19wZXJmLWRlZXRzOmNsZWFyLXBlcmYifSkscj17fSxuPXt9LHM9cGVyZm9ybWFuY2Uubm93KCl9YXN5bmMgZnVuY3Rpb24gbCgpe09iamVjdC5rZXlzKHIpLm1hcCgodD0+e2EoInRpbWluZyIsdCxyW3RdLmRhdGEubWFwKCh0PT4oe3g6dC5zdGFydCt0LnRvb2sseTp0LnRvb2t9KSkpKX0pKSxPYmplY3Qua2V5cyhuKS5tYXAoKHQ9PnthKCJjb3VudCIsdCxuW3RdLm1hcCgoKHQsZSk9Pih7eDp0LnRpbWUseTplfSkpKSl9KSl9ZnVuY3Rpb24gYyh0KXtudWxsPT1yW3RdJiYoclt0XT17c3RhcnQ6bnVsbCxkYXRhOltdfSk7bGV0IGU9clt0XTtpZihudWxsIT1lLnN0YXJ0KXRocm93IG5ldyBFcnJvcihgdGltZXIgYWxyZWFkeSBzdGFydGVkICR7dH1gKTtlLnN0YXJ0PXBlcmZvcm1hbmNlLm5vdygpfWZ1bmN0aW9uIGgodCl7bGV0IGU9cGVyZm9ybWFuY2Uubm93KCksaT1yW3RdO2lmKGkmJm51bGwhPWkuc3RhcnQpe2xldCB0PWUtaS5zdGFydCxyPWkuc3RhcnQtcztpLnN0YXJ0PW51bGwsaS5kYXRhLmxlbmd0aDw0ZTQmJmkuZGF0YS5wdXNoKHtzdGFydDpyLHRvb2s6dH0pfX1mdW5jdGlvbiBmKHQpe251bGw9PW5bdF0mJihuW3RdPVtdKSxuW3RdLnB1c2goe3RpbWU6cGVyZm9ybWFuY2Uubm93KCl9KX1nbG9iYWxUaGlzLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCh0PT57c3dpdGNoKHQuZGF0YS50eXBlKXtjYXNlIl9fcGVyZi1kZWV0czpzdGFydC1wcm9maWxlIjpvKCk7YnJlYWs7Y2FzZSJfX3BlcmYtZGVldHM6c3RvcC1wcm9maWxlIjpsKCk7YnJlYWs7Y2FzZSJfX3BlcmYtZGVldHM6Y2xlYXItcGVyZiI6Y2FzZSJfX3BlcmYtZGVldHM6bG9nLXBlcmYiOiJ1bmRlZmluZWQiPT10eXBlb2Ygd2luZG93JiZzZWxmLnBvc3RNZXNzYWdlKHQuZGF0YSl9fSkpO2xldCB1PS9eKCg/IWNocm9tZXxhbmRyb2lkKS4pKnNhZmFyaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCksZD1uZXcgTWFwLHc9bmV3IE1hcDtmdW5jdGlvbiBnKHQsZSl7aWYoIXQpdGhyb3cgbmV3IEVycm9yKGUpfWxldCBtPTAscD0xLHk9MixiPTQ7Y2xhc3Mga3tjb25zdHJ1Y3Rvcih0LGU9InJlYWRvbmx5Iil7dGhpcy5kYj10LGYoInRyYW5zYWN0aW9ucyIpLHRoaXMudHJhbnM9dGhpcy5kYi50cmFuc2FjdGlvbihbImRhdGEiXSxlKSx0aGlzLnN0b3JlPXRoaXMudHJhbnMub2JqZWN0U3RvcmUoImRhdGEiKSx0aGlzLmxvY2tUeXBlPSJyZWFkb25seSI9PT1lP3A6Yix0aGlzLmNhY2hlZEZpcnN0QmxvY2s9bnVsbCx0aGlzLmN1cnNvcj1udWxsLHRoaXMucHJldlJlYWRzPW51bGx9YXN5bmMgcHJlZmV0Y2hGaXJzdEJsb2NrKHQpe2xldCBlPWF3YWl0IHRoaXMuZ2V0KDApO3JldHVybiB0aGlzLmNhY2hlZEZpcnN0QmxvY2s9ZSxlfWFzeW5jIHdhaXRDb21wbGV0ZSgpe3JldHVybiBuZXcgUHJvbWlzZSgoKHQsZSk9Pnt0aGlzLmNvbW1pdCgpLHRoaXMubG9ja1R5cGU9PT1iPyh0aGlzLnRyYW5zLm9uY29tcGxldGU9ZT0+dCgpLHRoaXMudHJhbnMub25lcnJvcj10PT5lKHQpKTp1P3RoaXMudHJhbnMub25jb21wbGV0ZT1lPT50KCk6dCgpfSkpfWNvbW1pdCgpe3RoaXMudHJhbnMuY29tbWl0JiZ0aGlzLnRyYW5zLmNvbW1pdCgpfWFzeW5jIHVwZ3JhZGVFeGNsdXNpdmUoKXt0aGlzLmNvbW1pdCgpLGYoInRyYW5zYWN0aW9ucyIpLHRoaXMudHJhbnM9dGhpcy5kYi50cmFuc2FjdGlvbihbImRhdGEiXSwicmVhZHdyaXRlIiksdGhpcy5zdG9yZT10aGlzLnRyYW5zLm9iamVjdFN0b3JlKCJkYXRhIiksdGhpcy5sb2NrVHlwZT1iO2xldCB0PXRoaXMuY2FjaGVkRmlyc3RCbG9jayxlPWF3YWl0IHRoaXMucHJlZmV0Y2hGaXJzdEJsb2NrKDUwMCk7aWYobnVsbD09dCYmbnVsbD09ZSlyZXR1cm4hMDtmb3IobGV0IGk9MjQ7aTw0MDtpKyspaWYoZVtpXSE9PXRbaV0pcmV0dXJuITE7cmV0dXJuITB9ZG93bmdyYWRlU2hhcmVkKCl7dGhpcy5jb21taXQoKSxmKCJ0cmFuc2FjdGlvbnMiKSx0aGlzLnRyYW5zPXRoaXMuZGIudHJhbnNhY3Rpb24oWyJkYXRhIl0sInJlYWRvbmx5IiksdGhpcy5zdG9yZT10aGlzLnRyYW5zLm9iamVjdFN0b3JlKCJkYXRhIiksdGhpcy5sb2NrVHlwZT1wfWFzeW5jIGdldCh0KXtyZXR1cm4gbmV3IFByb21pc2UoKChlLGkpPT57YygiZ2V0Iik7bGV0IHM9dGhpcy5zdG9yZS5nZXQodCk7cy5vbnN1Y2Nlc3M9dD0+e2goImdldCIpLGUocy5yZXN1bHQpfSxzLm9uZXJyb3I9dD0+aSh0KX0pKX1nZXRSZWFkRGlyZWN0aW9uKCl7bGV0IHQ9dGhpcy5wcmV2UmVhZHM7aWYodCl7aWYodFswXTx0WzFdJiZ0WzFdPHRbMl0mJnRbMl0tdFswXTwxMClyZXR1cm4ibmV4dCI7aWYodFswXT50WzFdJiZ0WzFdPnRbMl0mJnRbMF0tdFsyXTwxMClyZXR1cm4icHJldiJ9cmV0dXJuIG51bGx9cmVhZCh0KXtsZXQgZT0oKT0+bmV3IFByb21pc2UoKCh0LGUpPT57aWYobnVsbCE9dGhpcy5jdXJzb3JQcm9taXNlKXRocm93IG5ldyBFcnJvcigid2FpdEN1cnNvcigpIGNhbGxlZCBidXQgc29tZXRoaW5nIGVsc2UgaXMgYWxyZWFkeSB3YWl0aW5nIik7dGhpcy5jdXJzb3JQcm9taXNlPXtyZXNvbHZlOnQscmVqZWN0OmV9fSkpO2lmKHRoaXMuY3Vyc29yKXtsZXQgaT10aGlzLmN1cnNvcjtyZXR1cm4ibmV4dCI9PT1pLmRpcmVjdGlvbiYmdD5pLmtleSYmdDxpLmtleSsxMDA/KGMoInN0cmVhbS1uZXh0IiksaS5hZHZhbmNlKHQtaS5rZXkpLGUoKSk6InByZXYiPT09aS5kaXJlY3Rpb24mJnQ8aS5rZXkmJnQ+aS5rZXktMTAwPyhjKCJzdHJlYW0tbmV4dCIpLGkuYWR2YW5jZShpLmtleS10KSxlKCkpOih0aGlzLmN1cnNvcj1udWxsLHRoaXMucmVhZCh0KSl9e2xldCBpPXRoaXMuZ2V0UmVhZERpcmVjdGlvbigpO2lmKGkpe2xldCBzO3RoaXMucHJldlJlYWRzPW51bGwscz0icHJldiI9PT1pP0lEQktleVJhbmdlLnVwcGVyQm91bmQodCk6SURCS2V5UmFuZ2UubG93ZXJCb3VuZCh0KTtsZXQgcj10aGlzLnN0b3JlLm9wZW5DdXJzb3IocyxpKTtyZXR1cm4gYygic3RyZWFtIiksci5vbnN1Y2Nlc3M9dD0+e2goInN0cmVhbSIpLGgoInN0cmVhbS1uZXh0Iik7bGV0IGU9dC50YXJnZXQucmVzdWx0O2lmKHRoaXMuY3Vyc29yPWUsbnVsbD09dGhpcy5jdXJzb3JQcm9taXNlKXRocm93IG5ldyBFcnJvcigiR290IGRhdGEgZnJvbSBjdXJzb3IgYnV0IG5vdGhpbmcgaXMgd2FpdGluZyBpdCIpO3RoaXMuY3Vyc29yUHJvbWlzZS5yZXNvbHZlKGU/ZS52YWx1ZTpudWxsKSx0aGlzLmN1cnNvclByb21pc2U9bnVsbH0sci5vbmVycm9yPXQ9PntpZihjb25zb2xlLmxvZygiQ3Vyc29yIGZhaWx1cmU6Iix0KSxudWxsPT10aGlzLmN1cnNvclByb21pc2UpdGhyb3cgbmV3IEVycm9yKCJHb3QgZGF0YSBmcm9tIGN1cnNvciBidXQgbm90aGluZyBpcyB3YWl0aW5nIGl0Iik7dGhpcy5jdXJzb3JQcm9taXNlLnJlamVjdCh0KSx0aGlzLmN1cnNvclByb21pc2U9bnVsbH0sZSgpfXJldHVybiBudWxsPT10aGlzLnByZXZSZWFkcyYmKHRoaXMucHJldlJlYWRzPVswLDAsMF0pLHRoaXMucHJldlJlYWRzLnB1c2godCksdGhpcy5wcmV2UmVhZHMuc2hpZnQoKSx0aGlzLmdldCh0KX19YXN5bmMgc2V0KHQpe3JldHVybiB0aGlzLnByZXZSZWFkcz1udWxsLG5ldyBQcm9taXNlKCgoZSxpKT0+e2xldCBzPXRoaXMuc3RvcmUucHV0KHQudmFsdWUsdC5rZXkpO3Mub25zdWNjZXNzPXQ9PmUocy5yZXN1bHQpLHMub25lcnJvcj10PT5pKHQpfSkpfWFzeW5jIGJ1bGtTZXQodCl7dGhpcy5wcmV2UmVhZHM9bnVsbDtmb3IobGV0IGUgb2YgdCl0aGlzLnN0b3JlLnB1dChlLnZhbHVlLGUua2V5KX19YXN5bmMgZnVuY3Rpb24gdih0KXtyZXR1cm4gbmV3IFByb21pc2UoKChlLGkpPT57aWYoZC5nZXQodCkpcmV0dXJuIHZvaWQgZShkLmdldCh0KSk7Y29uc29sZS5sb2coIm9wZW5pbmciLHQpO2xldCBzPWdsb2JhbFRoaXMuaW5kZXhlZERCLm9wZW4odCwxKTtzLm9uc3VjY2Vzcz1pPT57Y29uc29sZS5sb2coImRiIGlzIG9wZW4hIix0KTtsZXQgcz1pLnRhcmdldC5yZXN1bHQ7cy5vbnZlcnNpb25jaGFuZ2U9KCk9Pntjb25zb2xlLmxvZygiY2xvc2luZyBiZWNhdXNlIHZlcnNpb24gY2hhbmdlZCIpLHMuY2xvc2UoKSxkLmRlbGV0ZSh0KX0scy5vbmNsb3NlPSgpPT57ZC5kZWxldGUodCl9LGQuc2V0KHQscyksZShzKX0scy5vbnVwZ3JhZGVuZWVkZWQ9dD0+e2xldCBlPXQudGFyZ2V0LnJlc3VsdDtlLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoImRhdGEiKXx8ZS5jcmVhdGVPYmplY3RTdG9yZSgiZGF0YSIpfSxzLm9uYmxvY2tlZD10PT5jb25zb2xlLmxvZygiYmxvY2tlZCIsdCkscy5vbmVycm9yPXMub25hYm9ydD10PT5pKHQudGFyZ2V0LmVycm9yKX0pKX1mdW5jdGlvbiBBKHQpe2xldCBlPWQuZ2V0KHQpO2UmJihjb25zb2xlLmxvZygiY2xvc2luZyBkYiIpLGUuY2xvc2UoKSxkLmRlbGV0ZSh0KSl9YXN5bmMgZnVuY3Rpb24gUih0LGUsaSl7bGV0IHM9dy5nZXQodCk7aWYocyl7aWYoInJlYWR3cml0ZSI9PT1lJiZzLmxvY2tUeXBlPT09cCl0aHJvdyBuZXcgRXJyb3IoIkF0dGVtcHRlZCB3cml0ZSBidXQgb25seSBoYXMgU0hBUkVEIGxvY2siKTtyZXR1cm4gaShzKX1zPW5ldyBrKGF3YWl0IHYodCksZSksYXdhaXQgaShzKSxhd2FpdCBzLndhaXRDb21wbGV0ZSgpfWFzeW5jIGZ1bmN0aW9uIF8odCxlLGkpe2xldCBzPWZ1bmN0aW9uKHQpe3JldHVybiB3LmdldCh0KX0oZSk7aWYoaT09PXApe2lmKG51bGw9PXMpdGhyb3cgbmV3IEVycm9yKCJVbmxvY2sgZXJyb3IgKFNIQVJFRCk6IG5vIHRyYW5zYWN0aW9uIHJ1bm5pbmciKTtzLmxvY2tUeXBlPT09YiYmcy5kb3duZ3JhZGVTaGFyZWQoKX1lbHNlIGk9PT1tJiZzJiYoYXdhaXQgcy53YWl0Q29tcGxldGUoKSx3LmRlbGV0ZShlKSk7dC5pbnQzMigwKSx0LmZpbmFsaXplKCl9YXN5bmMgZnVuY3Rpb24geih0LGUpe2xldCBpPXQuc3RyaW5nKCk7c3dpdGNoKGkpe2Nhc2UicHJvZmlsZS1zdGFydCI6dC5kb25lKCksbygpLGUuaW50MzIoMCksZS5maW5hbGl6ZSgpLHoodCxlKTticmVhaztjYXNlInByb2ZpbGUtc3RvcCI6dC5kb25lKCksbCgpLGF3YWl0IG5ldyBQcm9taXNlKCh0PT5zZXRUaW1lb3V0KHQsMWUzKSkpLGUuaW50MzIoMCksZS5maW5hbGl6ZSgpLHoodCxlKTticmVhaztjYXNlIndyaXRlQmxvY2tzIjp7bGV0IGk9dC5zdHJpbmcoKSxzPVtdO2Zvcig7IXQuZG9uZSgpOyl7bGV0IGU9dC5pbnQzMigpLGk9dC5ieXRlcygpO3MucHVzaCh7cG9zOmUsZGF0YTppfSl9YXdhaXQgYXN5bmMgZnVuY3Rpb24odCxlLGkpe3JldHVybiBSKGUsInJlYWR3cml0ZSIsKGFzeW5jIGU9Pnthd2FpdCBlLmJ1bGtTZXQoaS5tYXAoKHQ9Pih7a2V5OnQucG9zLHZhbHVlOnQuZGF0YX0pKSkpLHQuaW50MzIoMCksdC5maW5hbGl6ZSgpfSkpfShlLGkscykseih0LGUpO2JyZWFrfWNhc2UicmVhZEJsb2NrIjp7bGV0IGk9dC5zdHJpbmcoKSxzPXQuaW50MzIoKTt0LmRvbmUoKSxhd2FpdCBhc3luYyBmdW5jdGlvbih0LGUsaSl7cmV0dXJuIFIoZSwicmVhZG9ubHkiLChhc3luYyBlPT57bGV0IHM9YXdhaXQgZS5yZWFkKGkpO251bGw9PXM/dC5ieXRlcyhuZXcgQXJyYXlCdWZmZXIoMCkpOnQuYnl0ZXMocyksdC5maW5hbGl6ZSgpfSkpfShlLGkscykseih0LGUpO2JyZWFrfWNhc2UicmVhZE1ldGEiOntsZXQgaT10LnN0cmluZygpO3QuZG9uZSgpLGF3YWl0IGFzeW5jIGZ1bmN0aW9uKHQsZSl7cmV0dXJuIFIoZSwicmVhZG9ubHkiLChhc3luYyBlPT57dHJ5e2NvbnNvbGUubG9nKCJSZWFkaW5nIG1ldGEiKTtsZXQgaT1hd2FpdCBlLmdldCgtMSk7Y29uc29sZS5sb2coIlJlYWRpbmcgbWV0YSAoZG9uZSkiLGkpO2xldCBzPWk7dC5pbnQzMihzP3Muc2l6ZTotMSksdC5pbnQzMihzP3MuYmxvY2tTaXplOi0xKSx0LmZpbmFsaXplKCl9Y2F0Y2goZSl7Y29uc29sZS5sb2coZSksdC5pbnQzMigtMSksdC5pbnQzMigtMSksdC5maW5hbGl6ZSgpfX0pKX0oZSxpKSx6KHQsZSk7YnJlYWt9Y2FzZSJ3cml0ZU1ldGEiOntsZXQgaT10LnN0cmluZygpLHM9dC5pbnQzMigpLHI9dC5pbnQzMigpO3QuZG9uZSgpLGF3YWl0IGFzeW5jIGZ1bmN0aW9uKHQsZSxpKXtyZXR1cm4gUihlLCJyZWFkd3JpdGUiLChhc3luYyBlPT57dHJ5e2F3YWl0IGUuc2V0KHtrZXk6LTEsdmFsdWU6aX0pLHQuaW50MzIoMCksdC5maW5hbGl6ZSgpfWNhdGNoKGUpe2NvbnNvbGUubG9nKGUpLHQuaW50MzIoLTEpLHQuZmluYWxpemUoKX19KSl9KGUsaSx7c2l6ZTpzLGJsb2NrU2l6ZTpyfSkseih0LGUpO2JyZWFrfWNhc2UiZGVsZXRlRmlsZSI6e2xldCBpPXQuc3RyaW5nKCk7dC5kb25lKCksYXdhaXQgYXN5bmMgZnVuY3Rpb24odCxlKXt0cnl7QShlKSxhd2FpdCBuZXcgUHJvbWlzZSgoKHQsaSk9PntsZXQgcz1nbG9iYWxUaGlzLmluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShlKTtzLm9uc3VjY2Vzcz10LHMub25lcnJvcj1pfSkpLHQuaW50MzIoMCksdC5maW5hbGl6ZSgpfWNhdGNoKGUpe3QuaW50MzIoLTEpLHQuZmluYWxpemUoKX19KGUsaSkseih0LGUpO2JyZWFrfWNhc2UiY2xvc2VGaWxlIjp7bGV0IGk9dC5zdHJpbmcoKTt0LmRvbmUoKSxhd2FpdCBhc3luYyBmdW5jdGlvbih0LGUpe0EoZSksdC5pbnQzMigwKSx0LmZpbmFsaXplKCl9KGUsaSkseih0LGUpO2JyZWFrfWNhc2UibG9ja0ZpbGUiOntsZXQgaT10LnN0cmluZygpLHM9dC5pbnQzMigpO3QuZG9uZSgpLGF3YWl0IGFzeW5jIGZ1bmN0aW9uKHQsZSxpKXtsZXQgcz13LmdldChlKTtpZihzKWlmKGk+cy5sb2NrVHlwZSl7ZyhzLmxvY2tUeXBlPT09cCxgVXByYWRpbmcgbG9jayB0eXBlIGZyb20gJHtzLmxvY2tUeXBlfSBpcyBpbnZhbGlkYCksZyhpPT09eXx8aT09PWIsYFVwZ3JhZGluZyBsb2NrIHR5cGUgdG8gJHtpfSBpcyBpbnZhbGlkYCk7bGV0IGU9YXdhaXQgcy51cGdyYWRlRXhjbHVzaXZlKCk7dC5pbnQzMihlPzA6LTEpLHQuZmluYWxpemUoKX1lbHNlIGcocy5sb2NrVHlwZT09PWksYERvd25ncmFkaW5nIGxvY2sgdG8gJHtpfSBpcyBpbnZhbGlkYCksdC5pbnQzMigwKSx0LmZpbmFsaXplKCk7ZWxzZXtnKGk9PT1wLGBOZXcgbG9ja3MgbXVzdCBzdGFydCBhcyBTSEFSRUQgaW5zdGVhZCBvZiAke2l9YCk7bGV0IHM9bmV3IGsoYXdhaXQgdihlKSk7YXdhaXQgcy5wcmVmZXRjaEZpcnN0QmxvY2soNTAwKSx3LnNldChlLHMpLHQuaW50MzIoMCksdC5maW5hbGl6ZSgpfX0oZSxpLHMpLHoodCxlKTticmVha31jYXNlInVubG9ja0ZpbGUiOntsZXQgaT10LnN0cmluZygpLHM9dC5pbnQzMigpO3QuZG9uZSgpLGF3YWl0IF8oZSxpLHMpLHoodCxlKTticmVha31kZWZhdWx0OnRocm93IG5ldyBFcnJvcigiVW5rbm93biBtZXRob2Q6ICIraSl9fXNlbGYub25tZXNzYWdlPXQ9Pntzd2l0Y2godC5kYXRhLnR5cGUpe2Nhc2UiaW5pdCI6e3Bvc3RNZXNzYWdlKHt0eXBlOiJfX2Fic3VyZDp3b3JrZXItcmVhZHkifSk7bGV0W3Mscl09dC5kYXRhLmJ1ZmZlcnM7eihuZXcgZShzLHtuYW1lOiJhcmdzIixkZWJ1ZzohMX0pLG5ldyBpKHIse25hbWU6InJlc3VsdHMiLGRlYnVnOiExfSkpO2JyZWFrfX19fSgpOwoK', null, false);
/* eslint-enable */

export default WorkerFactory;