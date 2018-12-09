/*
 * @version   : 4.6.0 - Ext.NET License
 * @author    : Object.NET, Inc. http://object.net/
 * @date      : 2018-06-16
 * @copyright : Copyright (c) 2008-2018, Object.NET, Inc. (http://object.net/). All rights reserved.
 * @license   : See license.txt and http://ext.net/license/.
 */

Ext.define('Ext.calendar.util.Date', {

    singleton: true,

    equalDates: function (dt1, dt2) {
        return dt1.year() == dt2.year() && dt1.month() == dt2.month() && dt1.date() == dt2.date() //dt1.getFullYear() == dt2.getFullYear() && dt1.getMonth() == dt2.getMonth() && dt1.getDate() == dt2.getDate();
    },

    diffDays: function (start, end) {
        //var day = 1000 * 60 * 60 * 24,
        //    clear = Ext.Date.clearTime,
        //    diff = clear(end, true).valueOf() - clear(start, true).valueOf();

        return end.diff(start, 'days')//Math.ceil(diff / day);
    },

    copyTime: function (fromDt, toDt) {
        var dt = toDt.clone()//Ext.Date.clone(toDt);
        dt.setHours(
            fromDt.getHours(),
            fromDt.getMinutes(),
            fromDt.getSeconds(),
            fromDt.getMilliseconds());

        return dt;
    },

    compare: function (dt1, dt2, precise) {
        if (precise !== true) {
            dt1 = Ext.Date.clone(dt1);
            dt1.setMilliseconds(0);
            dt2 = Ext.Date.clone(dt2);
            dt2.setMilliseconds(0);
        }
        return dt2.valueOf() - dt1.valueOf();
    },

    isMidnight: function (dt) {
        return dt.getHours() === 0 &&
            dt.getMinutes() === 0 &&
            dt.getSeconds() === 0 &&
            dt.getMilliseconds() === 0;
    },

    // private helper fn
    maxOrMin: function (max) {
        var dt = (max ? 0 : Number.MAX_VALUE),
            i = 0,
            args = arguments[1],
            ln = args.length;
        for (; i < ln; i++) {
            dt = Math[max ? 'max' : 'min'](dt, args[i].valueOf());
        }
        return new persianDate(dt);
    },

    max: function () {
        return this.maxOrMin.apply(this, [true, arguments]);
    },

    min: function () {
        return this.maxOrMin.apply(this, [false, arguments]);
    },

    today: function () {
        return new persianDate()//Ext.Date.clearTime(new Date());
    },


    add: function (dt, o) {
        if (!o) {
            return dt;
        }
        //var ExtDate = Ext.Date,
        //    dateAdd = ExtDate.add,
        var newDt = dt.clone(dt);

        if (o.years) {
            //newDt = dateAdd(newDt, ExtDate.YEAR, o.years);
            newDt = dt.add('years', o.years)
        }
        if (o.months) {
            newDt = dt.add('months', o.months)//dateAdd(newDt, ExtDate.MONTH, o.months);
        }
        if (o.weeks) {
            //o.days = (o.days || 0) + (o.weeks * 7);
            newDt = dt.add('weeks', o.weeks)
        }
        if (o.days) {
            //newDt = dateAdd(newDt, ExtDate.DAY, o.days);
            newDt = dt.add('days', o.days)
        }
        if (o.hours) {
            //newDt = dateAdd(newDt, ExtDate.HOUR, o.hours);
            newDt = dt.add('hours', o.hours)
        }
        if (o.minutes) {
            newDt = dateAdd(newDt, ExtDate.MINUTE, o.minutes);
        }
        if (o.seconds) {
            //newDt = dateAdd(newDt, ExtDate.SECOND, o.seconds);
            newDt = dt.add('seconds', o.seconds)
        }
        if (o.millis) {
            //newDt = dateAdd(newDt, ExtDate.MILLI, o.millis);
            newDt = dt.add('milliseconds', o.millis)
        }

        //return o.clearTime ? ExtDate.clearTime(newDt) : newDt;
        return newDt
    },

   
});

Ext.define('Ext.calendar.util.WeekEventRenderer', {

    requires: [
        'Ext.calendar.util.Date',
        'Ext.core.DomHelper'
    ],

    statics: {
        // private
        getEventRow: function (id, week, index) {
            var indexOffset = 1,
                //skip row with date #'s
                evtRow,
                wkRow = Ext.get(id + '-wk-' + week);
            if (wkRow) {
                var table = wkRow.child('.ext-cal-evt-tbl', true);
                evtRow = table.tBodies[0].childNodes[index + indexOffset];
                if (!evtRow) {
                    evtRow = Ext.core.DomHelper.append(table.tBodies[0], '<tr></tr>');
                }
            }
            return Ext.get(evtRow);
        },

        render: function (o) {
            var w = 0,
                grid = o.eventGrid,
                dt = o.viewStart.clone(),//Ext.Date.clone(o.viewStart),
                eventTpl = o.tpl,
                max = o.maxEventsPerDay != undefined ? o.maxEventsPerDay : 999,
                weekCount = o.weekCount < 1 ? 6 : o.weekCount,
                dayCount = o.weekCount == 1 ? o.dayCount : 7,
                cellCfg;

            dt.hours(1);
            for (; w < weekCount; w++) {
                if (!grid[w] || grid[w].length == 0) {
                    // no events or span cells for the entire week
                    if (weekCount == 1) {
                        row = this.getEventRow(o.id, w, 0);
                        cellCfg = {
                            tag: 'td',
                            cls: 'ext-cal-ev',
                            id: o.id + '-empty-0-day-' + Ext.Date.format(dt, 'Ymd'),
                            html: '&nbsp;'
                        };
                        if (dayCount > 1) {
                            cellCfg.colspan = dayCount;
                        }
                        Ext.core.DomHelper.append(row, cellCfg);
                    }
                    dt = Ext.calendar.util.Date.add(dt, { days: 7 });
                } else {
                    var row,
                        d = 0,
                        wk = grid[w],
                        startOfWeek = dt.clone()//Ext.Date.clone(dt),
                    endOfWeek = Ext.calendar.util.Date.add(startOfWeek, { days: dayCount, millis: -1 });

                    for (; d < dayCount; d++) {
                        if (wk[d]) {
                            var ev = 0,
                                emptyCells = 0,
                                skipped = 0,
                                day = wk[d],
                                ct = day.length,
                                evt;

                            for (; ev < ct; ev++) {
                                evt = day[ev];

                                // Add an empty cell for days that have sparse arrays.
                                // See EXTJSIV-7832.
                                if (!evt && (ev < max)) {
                                    row = this.getEventRow(o.id, w, ev);
                                    cellCfg = {
                                        tag: 'td',
                                        cls: 'ext-cal-ev',
                                        id: o.id + '-empty-' + ct + '-day-' + Ext.Date.format(dt, 'Ymd')
                                    };

                                    Ext.core.DomHelper.append(row, cellCfg);
                                }

                                if (!evt) {
                                    continue;
                                }

                                if (ev >= max) {
                                    skipped++;
                                    continue;
                                }

                                if (!evt.isSpan || evt.isSpanStart) {
                                    //skip non-starting span cells
                                    var item = evt.data || evt.event.data;
                                    item._weekIndex = w;
                                    item._renderAsAllDay = item[Ext.calendar.data.EventMappings.IsAllDay.name] || evt.isSpanStart;
                                    item.spanLeft = item[Ext.calendar.data.EventMappings.StartDate.name].valueOf() < startOfWeek.valueOf();
                                    item.spanRight = item[Ext.calendar.data.EventMappings.EndDate.name].valueOf() > endOfWeek.valueOf();
                                    item.spanCls = (item.spanLeft ? (item.spanRight ? 'ext-cal-ev-spanboth' :
                                        'ext-cal-ev-spanleft') : (item.spanRight ? 'ext-cal-ev-spanright' : ''));

                                    row = this.getEventRow(o.id, w, ev);
                                    cellCfg = {
                                        tag: 'td',
                                        cls: 'ext-cal-ev',
                                        cn: eventTpl.apply(o.templateDataFn(item))
                                    };
                                    var diff = Ext.calendar.util.Date.diffDays(dt, item[Ext.calendar.data.EventMappings.EndDate.name]) + 1,
                                        cspan = Math.min(diff, dayCount - d);

                                    if (cspan > 1) {
                                        cellCfg.colspan = cspan;
                                    }
                                    Ext.core.DomHelper.append(row, cellCfg);
                                }
                            }
                            if (ev > max) {
                                row = this.getEventRow(o.id, w, max);
                                Ext.core.DomHelper.append(row, {
                                    tag: 'td',
                                    cls: 'ext-cal-ev-more',
                                    id: 'ext-cal-ev-more-' + Ext.Date.format(dt, 'Ymd'),
                                    cn: {
                                        tag: 'a',
                                        html: Ext.String.format(o.moreText, skipped)
                                    }
                                });
                            }
                            if (ct < o.evtMaxCount[w]) {
                                row = this.getEventRow(o.id, w, ct);
                                if (row) {
                                    cellCfg = {
                                        tag: 'td',
                                        cls: 'ext-cal-ev',
                                        id: o.id + '-empty-' + (ct + 1) + '-day-' + Ext.Date.format(dt, 'Ymd')
                                    };
                                    var rowspan = o.evtMaxCount[w] - ct;
                                    if (rowspan > 1) {
                                        cellCfg.rowspan = rowspan;
                                    }
                                    Ext.core.DomHelper.append(row, cellCfg);
                                }
                            }
                        } else {
                            row = this.getEventRow(o.id, w, 0);
                            if (row) {
                                cellCfg = {
                                    tag: 'td',
                                    cls: 'ext-cal-ev',
                                    id: o.id + '-empty-day-' + Ext.Date.format(dt, 'Ymd')
                                };
                                if (o.evtMaxCount[w] > 1) {
                                    cellCfg.rowSpan = o.evtMaxCount[w];
                                }
                                Ext.core.DomHelper.append(row, cellCfg);
                            }
                        }
                        dt = Ext.calendar.util.Date.add(dt, { days: 1 });
                    }
                }
            }
        }
    }
});


Ext.ns('Ext.calendar.data');

Ext.calendar.data.CalendarMappings = {
    ID: {
        name: 'ID',
        mapping: 'ID',
        type: 'int'
    },
    CalendarId: {
        name: 'CalendarId',
        mapping: 'id',
        type: 'int'
    },
    Title: {
        name: 'Title',
        mapping: 'title',
        type: 'string'
    },
    Description: {
        name: 'Description',
        mapping: 'desc',
        type: 'string'
    },
    ColorId: {
        name: 'ColorId',
        mapping: 'color',
        type: 'int'
    },
    IsHidden: {
        name: 'IsHidden',
        mapping: 'hidden',
        type: 'boolean'
    }
};
Ext.define('Ext.calendar.data.CalendarModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.calendar.data.CalendarMappings'
    ],

    identifier: 'sequential',

    statics: {

        reconfigure: function () {
            var me = this,
                Mappings = Ext.calendar.data.CalendarMappings;

            // It is critical that the id property mapping is updated in case it changed, since it
            // is used elsewhere in the data package to match records on CRUD actions:
            me.prototype.idProperty = Mappings.CalendarId.name || 'id';

            me.replaceFields(Ext.Object.getValues(Mappings), true);

            return me;
        }
    }
},
    function () {
        this.reconfigure();
    });


Ext.ns('Ext.calendar.data');

Ext.calendar.data.EventMappings = {
    EventId: {
        name: 'EventId',
        mapping: 'id',
        type: 'int'
    },
    CalendarId: {
        name: 'CalendarId',
        mapping: 'cid',
        type: 'int'
    },
    Title: {
        name: 'Title',
        mapping: 'title',
        type: 'string'
    },
    StartDate: {
        name: 'StartDate',
        mapping: 'start',
        type: 'string',
    },
    EndDate: {
        name: 'EndDate',
        mapping: 'end',
        type: 'string'
    },
    Location: {
        name: 'Location',
        mapping: 'loc',
        type: 'string'
    },
    Notes: {
        name: 'Notes',
        mapping: 'notes',
        type: 'string'
    },
    Url: {
        name: 'Url',
        mapping: 'url',
        type: 'string'
    },
    IsAllDay: {
        name: 'IsAllDay',
        mapping: 'ad',
        type: 'boolean'
    },
    Reminder: {
        name: 'Reminder',
        mapping: 'rem',
        type: 'string'
    },
    IsNew: {
        name: 'IsNew',
        mapping: 'n',
        type: 'boolean'
    }
};

Ext.define('Ext.calendar.data.EventModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.calendar.data.EventMappings'
    ],

    identifier: 'sequential',

    statics: {

        reconfigure: function () {
            var me = this,
                Mappings = Ext.calendar.data.EventMappings;

            // It is critical that the id property mapping is updated in case it changed, since it
            // is used elsewhere in the data package to match records on CRUD actions:
            me.prototype.idProperty = Mappings.EventId.name || 'id';

            me.replaceFields(Ext.Object.getValues(Mappings), true);
            me.prototype.fieldsMap = me.fieldsMap; // This should be done by replaceFields, but probably a bug in ExtJS

            return me;
        }
    }
},
    function () {
        this.reconfigure();
    });


Ext.define('Ext.calendar.data.MemoryCalendarStore', {
    extend: 'Ext.data.Store',
    model: 'Ext.calendar.data.CalendarModel',

    requires: [
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json',
        'Ext.calendar.data.CalendarModel',
        'Ext.calendar.data.CalendarMappings'
    ],

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'calendars'
        },
        writer: {
            type: 'json'
        }
    },

    autoLoad: true,

    initComponent: function () {
        var me = this,
            calendarData = Ext.calendar.data;

        me.sorters = me.sorters || [{
            property: calendarData.CalendarMappings.Title.name,
            direction: 'ASC'
        }];

        me.idProperty =  me.idProperty || calendarData.CalendarMappings.CalendarId.name || 'id';

        me.fields = calendarData.CalendarModel.prototype.fields.getRange();

        me.callParent(arguments);
    }
});

Ext.define('Ext.calendar.data.MemoryEventStore', {
    extend: 'Ext.data.Store',
    model: 'Ext.calendar.data.EventModel',

    requires: [
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json',
        'Ext.calendar.data.EventModel',
        'Ext.calendar.data.EventMappings'
    ],

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'evts'
        },
        writer: {
            type: 'json'
        }
    },

    // private
    constructor: function (config) {
        config.sorters = config.sorters || [{   // #808
            property: Ext.calendar.data.EventMappings.StartDate.name,
            direction: 'ASC'
        }];

        this.callParent(arguments);
        this.idProperty = this.idProperty || Ext.calendar.data.EventMappings.EventId.mapping || 'id';
        this.fields = Ext.calendar.data.EventModel.getFields();
        this.onCreateRecords = Ext.Function.createInterceptor(this.onCreateRecords, this.interceptCreateRecords);
        this.initRecs();
    },

    // private - override to make sure that any records added in-memory
    // still get a unique PK assigned at the data level
    interceptCreateRecords: function (records, operation, success) {
        if (success) {
            var i = 0,
                rec,
                len = records.length;

            for (; i < len; i++) {
                records[i].data[Ext.calendar.data.EventMappings.EventId.name] = records[i].id;
            }
        }
    },

    // If the store started with preloaded inline data, we have to make sure the records are set up
    // properly as valid "saved" records otherwise they may get "added" on initial edit.
    initRecs: function () {
        this.each(function (rec) {
            rec.store = this;
            rec.phantom = false;
        }, this);
    },

    // private - override the default logic for memory storage
    onProxyLoad: function (operation) {
        var me = this,
            records;

        if (me.data && me.data.length > 0) {
            // this store has already been initially loaded, so do not reload
            // and lose updates to the store, just use store's latest data
            me.totalCount = me.data.length;
            records = me.data.items;
        }
        else {
            // this is the initial load, so defer to the proxy's result
            var resultSet = operation.getResultSet(),
                successful = operation.wasSuccessful();

            records = operation.getRecords();

            if (resultSet) {
                me.totalCount = resultSet.total;
            }
            if (successful) {
                me.loadRecords(records, operation);
            }
        }

        me.loading = false;
        me.fireEvent('load', me, records, successful);
    }
});
Ext.define('Ext.calendar.data.EventStore', {
    extend: 'Ext.data.Store',
    model: 'Ext.calendar.data.EventModel',

    constructor: function (config) {
        this.deferLoad = config.autoLoad;
        config.autoLoad = false;
        this.callParent(arguments);
    },

    load: function (o) {
        o = o || {};

        if (o.params) {
            delete this.initialParams;
        }

        if (this.initialParams) {
            o.params = o.params || {};
            Ext.apply(o.params, this.initialParams);
            delete this.initialParams;
        }

        this.callParent(arguments);
    }
});

Ext.define('Ext.calendar.dd.StatusProxy', {

    extend: 'Ext.dd.StatusProxy',

    animRepair: true,


    moveEventCls: 'ext-cal-dd-move',


    addEventCls: 'ext-cal-dd-add',

    // inherit docs
    childEls: [
        'ghost',
        'message'
    ],

    // inherit docs
    renderTpl: [
        '<div class="' + Ext.baseCSSPrefix + 'dd-drop-icon"></div>' +
        '<div class="ext-dd-ghost-ct">' +
        '<div id="{id}-ghost" data-ref="ghost" class="' + Ext.baseCSSPrefix + 'dd-drag-ghost"></div>' +
        '<div id="{id}-message" data-ref="message" class="' + Ext.baseCSSPrefix + 'dd-msg"></div>' +
        '</div>'
    ],

    // inherit docs
    update: function (html) {
        this.callParent(arguments);

        var el = this.ghost.dom.firstChild;
        if (el) {
            // if the ghost contains an event clone (from dragging an existing event)
            // set it to auto height to ensure visual consistency
            Ext.fly(el).setHeight('auto');
        }
    },


    updateMsg: function (msg) {
        this.message.update(msg);
    }
});

Ext.define('Ext.calendar.dd.DragZone', {
    extend: 'Ext.dd.DragZone',

    requires: [
        'Ext.calendar.dd.StatusProxy',
        'Ext.calendar.data.EventMappings'
    ],

    ddGroup: 'CalendarDD',
    eventSelector: '.ext-cal-evt',

    constructor: function (el, config) {
        if (!Ext.calendar._statusProxyInstance) {
            Ext.calendar._statusProxyInstance = new Ext.calendar.dd.StatusProxy();
        }
        this.proxy = Ext.calendar._statusProxyInstance;
        this.callParent(arguments);
    },

    getDragData: function (e) {
        // Check whether we are dragging on an event first
        var t = e.getTarget(this.eventSelector, 3);
        if (t) {
            var rec = this.view.getEventRecordFromEl(t);
            return {
                type: 'eventdrag',
                ddel: t,
                eventStart: rec.data[Ext.calendar.data.EventMappings.StartDate.name],
                eventEnd: rec.data[Ext.calendar.data.EventMappings.EndDate.name],
                proxy: this.proxy
            };
        }

        // If not dragging an event then we are dragging on
        // the calendar to add a new event
        t = this.view.getDayAt(e.getX(), e.getY());
        if (t.el) {
            return {
                type: 'caldrag',
                start: t.date,
                proxy: this.proxy
            };
        }
        return null;
    },

    onInitDrag: function (x, y) {
        if (this.dragData.ddel) {
            var ghost = this.dragData.ddel.cloneNode(true),
                child = Ext.fly(ghost).down('dl');

            Ext.fly(ghost).setWidth('auto');

            if (child) {
                // for IE/Opera
                child.setHeight('auto');
            }
            this.proxy.update(ghost);
            this.onStartDrag(x, y);
        }
        else if (this.dragData.start) {
            this.onStartDrag(x, y);
        }
        this.view.onInitDrag();
        return true;
    },

    afterRepair: function () {
        if (Ext.enableFx && this.dragData.ddel) {
            Ext.fly(this.dragData.ddel).highlight(this.hlColor || 'c3daf9');
        }
        this.dragging = false;
    },

    getRepairXY: function (e) {
        if (this.dragData.ddel) {
            return Ext.fly(this.dragData.ddel).getXY();
        }
    },

    afterInvalidDrop: function (e, id) {
        Ext.select('.ext-dd-shim').hide();
    }
});

Ext.define('Ext.calendar.dd.DropZone', {
    extend: 'Ext.dd.DropZone',

    requires: [
        'Ext.Layer',
        'Ext.calendar.data.EventMappings',
        'Ext.calendar.util.Date'
    ],

    ddGroup: 'CalendarDD',
    eventSelector: '.ext-cal-evt',

    // private
    shims: [],

    getTargetFromEvent: function (e) {
        var dragOffset = this.dragOffset || 0,
            y = e.getY() - dragOffset,
            d = this.view.getDayAt(e.getX(), y);

        return d.el ? d : null;
    },

    onNodeOver: function (n, dd, e, data) {
        var D = Ext.calendar.util.Date,
            start = data.type == 'eventdrag' ? n.date : D.min(data.start, n.date),
            end = data.type == 'eventdrag' ? D.add(n.date, { days: D.diffDays(data.eventStart, data.eventEnd) }) :
                D.max(data.start, n.date);

        if (!this.dragStartDate || !this.dragEndDate || (D.diffDays(start, this.dragStartDate) != 0) || (D.diffDays(end, this.dragEndDate) != 0)) {
            this.dragStartDate = start;
            this.dragEndDate = D.add(end, { days: 1, millis: -1, clearTime: true });
            this.shim(start, end);

            var range = Ext.Date.format(start, 'n/j');
            if (D.diffDays(start, end) > 0) {
                range += '-' + Ext.Date.format(end, 'n/j');
            }
            var msg = Ext.util.Format.format(data.type == 'eventdrag' ? this.moveText : this.createText, range);
            data.proxy.updateMsg(msg);
        }
        return this.dropAllowed;
    },

    shim: function (start, end) {
        this.currWeek = -1;
        this.DDMInstance.notifyOccluded = true;
        var dt = start.clone()//Ext.Date.clone(start),
        i = 0,
            shim,
            box,
            D = Ext.calendar.util.Date,
            cnt = D.diffDays(dt, end) + 1;

        dt.hours(1);
        Ext.each(this.shims,
            function (shim) {
                if (shim) {
                    shim.isActive = false;
                }
            }
        );

        while (i++ < cnt) {
            var dayEl = this.view.getDayEl(dt);

            // if the date is not in the current view ignore it (this
            // can happen when an event is dragged to the end of the
            // month so that it ends outside the view)
            if (dayEl) {
                var wk = this.view.getWeekIndex(dt);
                shim = this.shims[wk];

                if (!shim) {
                    shim = this.createShim();
                    this.shims[wk] = shim;
                }
                if (wk != this.currWeek) {
                    shim.boxInfo = dayEl.getBox();
                    this.currWeek = wk;
                }
                else {
                    box = dayEl.getBox();
                    shim.boxInfo.right = box.right;
                    shim.boxInfo.width = box.right - shim.boxInfo.x;
                }
                shim.isActive = true;
            }
            dt = D.add(dt, { days: 1 });
        }

        Ext.each(this.shims, function (shim) {
            if (shim) {
                if (shim.isActive) {
                    shim.show();
                    shim.setBox(shim.boxInfo);
                }
                else if (shim.isVisible()) {
                    shim.hide();
                }
            }
        });
    },

    createShim: function () {
        if (!this.shimCt) {
            this.shimCt = Ext.get('ext-dd-shim-ct');
            if (!this.shimCt) {
                this.shimCt = document.createElement('div');
                this.shimCt.id = 'ext-dd-shim-ct';
                Ext.getBody().appendChild(this.shimCt);
            }
        }
        var el = document.createElement('div');
        el.className = 'ext-dd-shim';
        this.shimCt.appendChild(el);

        return new Ext.Layer({
            shadow: false,
            useDisplay: true,
            constrain: false
        },
            el);
    },

    clearShims: function () {
        Ext.each(this.shims,
            function (shim) {
                if (shim) {
                    shim.hide();
                }
            });
        this.DDMInstance.notifyOccluded = false;
    },

    onContainerOver: function (dd, e, data) {
        return this.dropAllowed;
    },

    onCalendarDragComplete: function () {
        delete this.dragStartDate;
        delete this.dragEndDate;
        this.clearShims();
    },

    onNodeDrop: function (n, dd, e, data) {
        if (n && data) {
            if (data.type == 'eventdrag') {
                var rec = this.view.getEventRecordFromEl(data.ddel),
                    dt = Ext.calendar.util.Date.copyTime(rec.data[Ext.calendar.data.EventMappings.StartDate.name], n.date);

                this.view.onEventDrop(rec, dt);
                this.onCalendarDragComplete();
                return true;
            }
            if (data.type == 'caldrag') {
                this.view.onCalendarEndDrag(this.dragStartDate, this.dragEndDate,
                    Ext.bind(this.onCalendarDragComplete, this));
                //shims are NOT cleared here -- they stay visible until the handling
                //code calls the onCalendarDragComplete callback which hides them.
                return true;
            }
        }
        this.onCalendarDragComplete();
        return false;
    },

    onContainerDrop: function (dd, e, data) {
        this.onCalendarDragComplete();
        return false;
    }
});


Ext.define('Ext.calendar.dd.DayDragZone', {
    extend: 'Ext.calendar.dd.DragZone',
    requires: [
        'Ext.calendar.data.EventMappings'
    ],

    ddGroup: 'DayViewDD',
    resizeSelector: '.ext-evt-rsz',

    getDragData: function (e) {
        var startDateName = Ext.calendar.data.EventMappings.StartDate.name,
            endDateName = Ext.calendar.data.EventMappings.EndDate.name,
            t, p, rec;

        t = e.getTarget(this.resizeSelector, 2, true);

        if (t) {
            p = t.parent(this.eventSelector);
            rec = this.view.getEventRecordFromEl(p);

            return {
                type: 'eventresize',
                ddel: p.dom,
                eventStart: rec.get(startDateName),
                eventEnd: rec.get(endDateName),
                proxy: this.proxy
            };
        }

        t = e.getTarget(this.eventSelector, 3);
        if (t) {
            rec = this.view.getEventRecordFromEl(t);
            return {
                type: 'eventdrag',
                ddel: t,
                eventStart: rec.get(startDateName),
                eventEnd: rec.get(endDateName),
                proxy: this.proxy
            };
        }

        // If not dragging/resizing an event then we are dragging on
        // the calendar to add a new event
        t = this.view.getDayAt(e.getX(), e.getY());
        if (t.el) {
            return {
                type: 'caldrag',
                dayInfo: t,
                proxy: this.proxy
            };
        }
        return null;
    }
});

Ext.define('Ext.calendar.dd.DayDropZone', {
    extend: 'Ext.calendar.dd.DropZone',
    requires: [
        'Ext.calendar.util.Date'
    ],

    ddGroup: 'DayViewDD',

    onNodeOver: function (n, dd, e, data) {
        var dt,
            box,
            endDt,
            text = this.createText,
            curr,
            start,
            end,
            evtEl,
            dayCol;
        if (data.type == 'caldrag') {
            if (!this.dragStartMarker) {
                // Since the container can scroll, this gets a little tricky.
                // There is no el in the DOM that we can measure by default since
                // the box is simply calculated from the original drag start (as opposed
                // to dragging or resizing the event where the orig event box is present).
                // To work around this we add a placeholder el into the DOM and give it
                // the original starting time's box so that we can grab its updated
                // box measurements as the underlying container scrolls up or down.
                // This placeholder is removed in onNodeDrop.
                this.dragStartMarker = n.el.parent().createChild({
                    style: 'position:absolute;'
                });
                this.dragStartMarker.setBox(n.timeBox);
                this.dragCreateDt = n.date;
            }
            box = this.dragStartMarker.getBox();
            box.height = Math.ceil(Math.abs(e.xy[1] - box.y) / n.timeBox.height) * n.timeBox.height;

            if (e.xy[1] < box.y) {
                box.height += n.timeBox.height;
                box.y = box.y - box.height + n.timeBox.height;
                endDt = Ext.Date.add(this.dragCreateDt, Ext.Date.MINUTE, 30);
            }
            else {
                n.date = Ext.Date.add(n.date, Ext.Date.MINUTE, 30);
            }
            this.shim(this.dragCreateDt, box);

            curr = Ext.calendar.util.Date.copyTime(n.date, this.dragCreateDt);
            this.dragStartDate = Ext.calendar.util.Date.min(this.dragCreateDt, curr);
            this.dragEndDate = endDt || Ext.calendar.util.Date.max(this.dragCreateDt, curr);

            dt = Ext.Date.format(this.dragStartDate, 'g:ia-') + Ext.Date.format(this.dragEndDate, 'g:ia');
        }
        else {
            evtEl = Ext.get(data.ddel);
            dayCol = evtEl.parent().parent();
            box = evtEl.getBox();

            box.width = dayCol.getWidth();

            if (data.type == 'eventdrag') {
                if (this.dragOffset === undefined) {
                    this.dragOffset = n.timeBox.y - box.y;
                    box.y = n.timeBox.y - this.dragOffset;
                }
                else {
                    box.y = n.timeBox.y;
                }
                dt = Ext.Date.format(n.date, 'n/j g:ia');
                box.x = n.el.getX();

                this.shim(n.date, box);
                text = this.moveText;
            }
            if (data.type == 'eventresize') {
                if (!this.resizeDt) {
                    this.resizeDt = n.date;
                }
                box.x = dayCol.getX();
                box.height = Math.ceil(Math.abs(e.xy[1] - box.y) / n.timeBox.height) * n.timeBox.height;
                if (e.xy[1] < box.y) {
                    box.y -= box.height;
                }
                else {
                    n.date = Ext.Date.add(n.date, Ext.Date.MINUTE, 30);
                }
                this.shim(this.resizeDt, box);

                curr = Ext.calendar.util.Date.copyTime(n.date, this.resizeDt);
                start = Ext.calendar.util.Date.min(data.eventStart, curr);
                end = Ext.calendar.util.Date.max(data.eventStart, curr);

                data.resizeDates = {
                    StartDate: start,
                    EndDate: end
                };
                dt = Ext.Date.format(start, 'g:ia-') + Ext.Date.format(end, 'g:ia');
                text = this.resizeText;
            }
        }

        data.proxy.updateMsg(Ext.util.Format.format(text, dt));
        return this.dropAllowed;
    },

    shim: function (dt, box) {
        Ext.each(this.shims,
            function (shim) {
                if (shim) {
                    shim.isActive = false;
                    shim.hide();
                }
            }
        );

        var shim = this.shims[0];
        if (!shim) {
            shim = this.createShim();
            this.shims[0] = shim;
        }

        shim.isActive = true;
        shim.show();
        shim.setBox(box);
        this.DDMInstance.notifyOccluded = true;
    },

    onNodeDrop: function (n, dd, e, data) {
        var rec;
        if (n && data) {
            if (data.type == 'eventdrag') {
                rec = this.view.getEventRecordFromEl(data.ddel);
                this.view.onEventDrop(rec, n.date);
                this.onCalendarDragComplete();
                delete this.dragOffset;
                return true;
            }
            if (data.type == 'eventresize') {
                rec = this.view.getEventRecordFromEl(data.ddel);
                this.view.onEventResize(rec, data.resizeDates);
                this.onCalendarDragComplete();
                delete this.resizeDt;
                return true;
            }
            if (data.type == 'caldrag') {
                Ext.destroy(this.dragStartMarker);
                delete this.dragStartMarker;
                delete this.dragCreateDt;
                this.view.onCalendarEndDrag(this.dragStartDate, this.dragEndDate,
                    Ext.bind(this.onCalendarDragComplete, this));
                //shims are NOT cleared here -- they stay visible until the handling
                //code calls the onCalendarDragComplete callback which hides them.
                return true;
            }
        }
        this.onCalendarDragComplete();
        return false;
    }
});


Ext.define('Ext.calendar.form.field.CalendarCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.calendarpicker',
    requires: [
        'Ext.calendar.data.CalendarMappings'
    ],

    fieldLabel: 'کد حضور',
    triggerAction: 'all',
    queryMode: 'local',
    forceSelection: true,
    selectOnFocus: true,

    // private
    defaultCls: 'ext-color-default',

    // private
    constructor: function (config) {
        config.displayField = Ext.calendar.data.CalendarMappings.Title.name;
        config.valueField = Ext.calendar.data.CalendarMappings.ID.name;
        this.callParent(arguments);
    },

    // private
    initComponent: function () {
        this.listConfig = Ext.apply(this.listConfig || {}, {
            getInnerTpl: this.getListItemTpl
        });

        this.callParent(arguments);
    },

    // private
    getListItemTpl: function (displayField) {
        return '<div class="x-combo-list-item ext-color-{' + Ext.calendar.data.CalendarMappings.CalendarId.name +
            '}"><div class="ext-cal-picker-icon">&#160;</div>{' + displayField + '}</div>';
    },

    // private
    afterRender: function () {
        this.callParent(arguments);

        this.wrap = this.el.down('.x-form-text-wrap');
        this.wrap.addCls('ext-calendar-picker');

        this.icon = Ext.core.DomHelper.append(this.wrap, {
            tag: 'div', cls: 'ext-cal-picker-icon ext-cal-picker-mainicon'
        });
    },


    getStyleClass: function (value) {
        var val = value;

        if (!Ext.isEmpty(val)) {
            if (Ext.isArray(val)) {
                val = val[0];
            }
            return 'ext-color-' + (val.data ? val.data[Ext.calendar.data.CalendarMappings.CalendarId.name] : val);
        }
        return '';
    },

    // inherited docs
    setValue: function (value) {
        if (!value && this.store.getCount() > 0) {
            // ensure that a valid value is always set if possible
            value = this.store.getAt(0).data[Ext.calendar.data.CalendarMappings.CalendarId.name/*this.valueField*/];
        }

        this.callParent(arguments);
    },

    onChange: function (newVal, oldVal) {
        this.callParent(arguments);
        
        if (this.wrap && newVal) {

            newVal = this.findRecordByValue(newVal).data.CalendarId

            var currentClass = this.getStyleClass(oldVal),
                newClass = this.getStyleClass(newVal);

            this.wrap.replaceCls(currentClass, newClass);
        }
    }
});

Ext.define('Ext.calendar.form.field.DateRange', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.daterangefield',

    requires: [
        'Ext.form.field.Date',
        'Ext.form.field.Time',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.layout.container.Column'
    ],


    toText: '',

    allDayText: 'All day',

    singleLine: true,

    dateFormat: 'n/j/Y',

    timeFormat: Ext.Date.use24HourTime ? 'G:i' : 'g:i A',

    // private
    fieldLayout: 'hbox',

    defaults: {
        margin: '0 5 0 0'
    },

    // private
    initComponent: function () {
        var me = this;

        me.addCls('ext-dt-range');

        if (me.singleLine) {
            me.layout = me.fieldLayout;
            me.items = me.getFieldConfigs();
        }
        else {
            me.items = [{
                xtype: 'container',
                layout: me.fieldLayout,
                items: [
                    me.getStartDateConfig(),
                    // me.getStartTimeConfig(),
                    //me.getDateSeparatorConfig(),
                    me.getEndDateConfig()
                ]
            }/*, {
                xtype: 'container',
                layout: me.fieldLayout,
                items: [
                    me.getEndDateConfig(),
                    //me.getEndTimeConfig(),
                   // me.getAllDayConfig()
                ]
            }*/];
        }

        me.callParent(arguments);
        me.initRefs();
    },

    initRefs: function () {
        var me = this;
        me.startDate = me.down('#' + me.id + '-start-date');
        ////me.startTime = me.down('#' + me.id + '-start-time');
        ////me.endTime = me.down('#' + me.id + '-end-time');
        me.endDate = me.down('#' + me.id + '-end-date');
        ////me.allDay = me.down('#' + me.id + '-allday');
        //me.toLabel = me.down('#' + me.id + '-to-label');

        //me.startDate.validateOnChange = me.endDate.validateOnChange = false;

        //me.startDate.isValid = me.endDate.isValid = function () {
        //    var me = this,
        //        valid = Ext.isDate(me.getValue());
        //    if (!valid) {
        //        me.focus();
        //    }
        //    return valid;
        //};
    },

    getFieldConfigs: function () {
        var me = this;
        return [
            me.getStartDateConfig(),
            //me.getStartTimeConfig(),
            //me.getDateSeparatorConfig(),
            //me.getEndTimeConfig(),
            me.getEndDateConfig(),
            //me.getAllDayConfig()
        ];
    },

    getStartDateConfig: function () {
        return {
            id: "calCode_startDate",
            itemId: this.id + '-start-date',
            fieldLabel: "از تاریخ",
            destroyed: false,
            labelWidth: 50,
            width: 170,
            inputMask: "9999/99/99",
            //rtl: false,
            //labelAlign: "left",
            tabIndex: 1,
            xtype: "textfield",
            fieldStyle: "text-align:right",
            //labelStyle: "direction:rtl",
            vtype: "isValidDate",
            vtypeText: "تاریخ نامعتبر است",
            allowBlank: false,
            blankText: ".این فیلد باید پر باشد",
            iconCls: "#Date",
            inputWrapCls: "x-ltr x-form-text-wrap-default"
        }
    },



    getEndDateConfig: function () {
        return {
            id: "calCode_endDate",
            itemId: this.id + '-end-date',
            xtype: "textfield",
            fieldLabel: "تا تاریخ",
            allowBlank: false,
            blankText: ".این فیلد باید پر باشد",
            destroyed: false,
            inputMask: '9999/99/99',
            labelWidth: 50,
            width: 170,
            //rtl: false,
            fieldStyle: "text-align:right",
            labelStyle: "direction:rtl",
            vtype: "isValidDate",
            vtypeText: "تاریخ نامعتبر است",
            iconCls: "#Date",
            inputWrapCls: "x-ltr x-form-text-wrap-default"
        }
    },

    //getEndTimeConfig: function () {
    //    return {
    //        xtype: 'timefield',
    //        itemId: this.id + '-end-time',
    //        hidden: this.showTimes === false,
    //        labelWidth: 0,
    //        hideLabel: true,
    //        width: 90,
    //        format: this.timeFormat,
    //        listeners: {
    //            'select': {
    //                fn: function () {
    //                    this.onFieldChange('time', 'end');
    //                },
    //                scope: this
    //            }
    //        }
    //    };
    //},

    getDuration: function () {
        var me = this,
            start = me.getDT('start'),
            end = me.getDT('end');

        return end.valueOf() - start.valueOf();
    },

    //getAllDayConfig: function () {
    //    return {
    //        xtype: 'checkbox',
    //        itemId: this.id + '-allday',
    //        hidden: this.showTimes === false || this.showAllDay === false,
    //        boxLabel: this.allDayText,
    //        margin: '2 5 0 0',
    //        handler: this.onAllDayChange,
    //        scope: this
    //    };
    //},

    //onAllDayChange: function (chk, checked) {
    //    this.startTime.setVisible(!checked);
    //    this.endTime.setVisible(!checked);
    //},

    //getDateSeparatorConfig: function () {
    //    return {
    //        xtype: 'label',
    //        itemId: this.id + '-to-label',
    //        text: this.toText,
    //        margin: '4 5 0 0'
    //    };
    //},

    isSingleLine: function () {
        var me = this;

        if (me.calculatedSingleLine === undefined) {
            if (me.singleLine == 'auto') {
                var ownerCtEl = me.ownerCt.getEl(),
                    w = me.ownerCt.getWidth() - ownerCtEl.getPadding('lr'),
                    el = ownerCtEl.down('.x-panel-body');

                if (el) {
                    w -= el.getPadding('lr');
                }

                el = ownerCtEl.down('.x-form-item-label');
                if (el) {
                    w -= el.getWidth() - el.getPadding('lr');
                }
                me.calculatedSingleLine = w <= me.singleLineMinWidth ? false : true;
            }
            else {
                me.calculatedSingleLine = me.singleLine !== undefined ? me.singleLine : true;
            }
        }
        return me.calculatedSingleLine;
    },

    // private
    onFieldChange: function (type, startend) {
        this.checkDates(type, startend);
        this.fireEvent('change', this, this.getValue());
    },

    // private
    checkDates: function (type, startend) {
        var me = this,
            startField = me.down('#' + me.id + '-start-' + type),
            endField = me.down('#' + me.id + '-end-' + type),
            startValue = me.getDT('start'),
            endValue = me.getDT('end');

        if (startValue > endValue) {
            if (startend == 'start') {
                endField.setValue(startValue);
            } else {
                startField.setValue(endValue);
                me.checkDates(type, 'start');
            }
        }
        if (type == 'date') {
            me.checkDates('time', startend);
        }
    },


    getValue: function () {
        var eDate = Ext.calendar.util.Date,
            start = this.getDT('start'),
            end = this.getDT('end')
        //allDay = this.allDay.getValue();

        //if (/*Ext.isDate(start) && Ext.isDate(end) &&*/ start.valueOf() !== end.valueOf()) {
        //    if ( eDate.isMidnight(start) && eDate.isMidnight(end)) {
        //        // 12:00am -> 12:00am over n days, all day event
        //        //allDay = true;
        //        end = eDate.add(end, {
        //            days: -1
        //        });
        //    }
        //}

        return [start, end];
    },

    // private getValue helper
    getDT: function (startend) {
        var //time = this[startend + 'Time'].getValue(),
            dt = this[startend + 'Date'].getValue();

        //if (Ext.isDate(dt)) {
        //    dt = Ext.Date.format(dt, this[startend + 'Date'].format);
        //}
        //else {
        //    return null;
        //};
        //if (time && time != '') {
        //    //time = Ext.Date.format(time, this[startend + 'Time'].format);
        //    var val = Ext.Date.parseDate(dt, this[startend + 'Date'].format /*+ ' ' + this[startend + 'Time'].format*/);
        //    return val;
        //    //return Ext.Date.parseDate(dt+' '+time, this[startend+'Date'].format+' '+this[startend+'Time'].format);
        //}
        return new persianDate(dateToArray(dt)) //Ext.Date.parseDate(dt, this[startend + 'Date'].format);

    },


    setValue: function (v) {
        if (!v) {
            return;
        }
        if (Ext.isArray(v)) {
            this.setDT(v[0], 'start');
            this.setDT(v[1], 'end');
            this.allDay.setValue(!!v[2]);
        }
        else if (Ext.isDate(v)) {
            this.setDT(v, 'start');
            this.setDT(v, 'end');
            this.allDay.setValue(false);
        }
        else if (v[Ext.calendar.data.EventMappings.StartDate.name]) { //object
            this.setDT(v[Ext.calendar.data.EventMappings.StartDate.name], 'start');
            if (!this.setDT(v[Ext.calendar.data.EventMappings.EndDate.name], 'end')) {
                this.setDT(v[Ext.calendar.data.EventMappings.StartDate.name], 'end');
            }
            //this.allDay.setValue(!!v[Ext.calendar.data.EventMappings.IsAllDay.name]);
        }
    },

    // private setValue helper
    setDT: function (dt, startend) {
        if (dt /*&& dt.isPersianDate()*/) {
            this[startend + 'Date'].setValue(dt.dayDate);
            //this[startend + 'Time'].setValue(Ext.Date.format(dt, this[startend + 'Time'].format));
            return true;
        }
    },

    // inherited docs
    isDirty: function () {
        var dirty = false;
        if (this.rendered && !this.disabled) {
            this.items.each(function (item) {
                if (item.isDirty()) {
                    dirty = true;
                    return false;
                }
            });
        }
        return dirty;
    },

    // private
    onDisable: function () {
        this.delegateFn('disable');
    },

    // private
    onEnable: function () {
        this.delegateFn('enable');
    },

    // inherited docs
    reset: function () {
        this.delegateFn('reset');
    },

    // private
    delegateFn: function (fn) {
        this.items.each(function (item) {
            if (item[fn]) {
                item[fn]();
            }
        });
    },

    // private
    beforeDestroy: function () {
        Ext.destroy(this.fieldCt);
        this.callParent(arguments);
    },


    getRawValue: Ext.emptyFn,

    setRawValue: Ext.emptyFn
});

Ext.define('Ext.calendar.form.field.ReminderCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.reminderfield',

    fieldLabel: 'Reminder',
    queryMode: 'local',
    triggerAction: 'all',
    forceSelection: true,
    displayField: 'desc',
    valueField: 'value',

    // private
    initComponent: function () {
        this.store = this.store || new Ext.data.ArrayStore({
            fields: ['value', 'desc'],
            idIndex: 0,
            data: [
                ['', 'None'],
                ['0', 'At start time'],
                ['5', '5 minutes before start'],
                ['15', '15 minutes before start'],
                ['30', '30 minutes before start'],
                ['60', '1 hour before start'],
                ['90', '1.5 hours before start'],
                ['120', '2 hours before start'],
                ['180', '3 hours before start'],
                ['360', '6 hours before start'],
                ['720', '12 hours before start'],
                ['1440', '1 day before start'],
                ['2880', '2 days before start'],
                ['4320', '3 days before start'],
                ['5760', '4 days before start'],
                ['7200', '5 days before start'],
                ['10080', '1 week before start'],
                ['20160', '2 weeks before start']
            ]
        });

        this.callParent();
    },

    // inherited docs
    initValue: function () {
        if (this.value !== undefined) {
            this.setValue(this.value);
        }
        else {
            this.setValue('');
        }
        this.originalValue = this.getValue();
    }
});


Ext.define('Ext.calendar.form.EventDetails', {
    extend: 'Ext.form.Panel',
    alias: 'widget.eventeditform',

    requires: [
        'Ext.calendar.form.field.DateRange',
        'Ext.calendar.form.field.ReminderCombo',
        'Ext.calendar.data.EventMappings',
        'Ext.calendar.form.field.CalendarCombo'
    ],

    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 65
    },
    title: 'انتخاب کد حضور',
    titleTextAdd: 'انتخاب کد حضور جدید',
    titleTextEdit: 'تغییر کد حضور',
    bodyStyle: 'background:transparent;padding:20px 20px 10px;',
    border: false,
    buttonAlign: 'center',
    autoHeight: true,
    // to allow for the notes field to autogrow
    cls: 'ext-evt-edit-form',

    // private properties:
    newId: 10000,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    // private
    initComponent: function () {
        this.titleField = new Ext.form.Text({
            fieldLabel: 'Title',
            name: Ext.calendar.data.EventMappings.Title.name,
            anchor: '90%'
        });
        this.dateRangeField = new Ext.calendar.form.field.DateRange({
            fieldLabel: 'When',
            singleLine: false,
            anchor: '90%'
        });
        this.reminderField = new Ext.calendar.form.field.ReminderCombo({
            name: 'Reminder',
            anchor: '70%'
        });
        this.notesField = new Ext.form.TextArea({
            fieldLabel: 'Notes',
            name: Ext.calendar.data.EventMappings.Notes.name,
            grow: true,
            growMax: 150,
            anchor: '100%'
        });
        this.locationField = new Ext.form.Text({
            fieldLabel: 'Location',
            name: Ext.calendar.data.EventMappings.Location.name,
            anchor: '100%'
        });
        this.urlField = new Ext.form.Text({
            fieldLabel: 'Web Link',
            name: Ext.calendar.data.EventMappings.Url.name,
            anchor: '100%'
        });

        var leftFields = [this.titleField, this.dateRangeField, this.reminderField],
            rightFields = [this.notesField, this.locationField, this.urlField];

        if (this.calendarStore) {
            this.calendarField = new Ext.calendar.form.field.CalendarCombo({
                store: this.calendarStore,
                anchor: '70%',
                name: Ext.calendar.data.EventMappings.CalendarId.name
            });
            leftFields.splice(2, 0, this.calendarField);
        }

        this.items = [{
            id: 'left-col',
            flex: 0.65,
            layout: 'anchor',
            border: false,
            items: leftFields
        },
        {
            id: 'right-col',
            flex: 0.35,
            layout: 'anchor',
            border: false,
            items: rightFields
        }];

        this.fbar = [/*{
            cls: 'ext-del-btn',
            itemId: this.id + '-del-btn',
            text: 'حذف کد حضور',
            scope: this,
            handler: this.onDelete,
            minWidth: 150
        }*/,
        {
            text: 'ذخیره',
            scope: this,
            handler: this.onSave
        },
        {
            text: 'بستن',
            scope: this,
            handler: this.onCancel
        }];

        this.callParent(arguments);
    },

    // inherited docs
    loadRecord: function (rec) {
        this.form.reset().loadRecord.apply(this.form, arguments);
        this.activeRecord = rec;
        this.dateRangeField.setValue(rec.data);

        if (this.calendarStore) {
            this.form.setValues({
                'calendar': rec.data[Ext.calendar.data.EventMappings.CalendarId.name]
            });
        }

        if (rec.phantom) {
            this.setTitle(this.titleTextAdd);
            this.down('#' + this.id + '-del-btn').hide();
        }
        else {
            this.setTitle(this.titleTextEdit);
            this.down('#' + this.id + '-del-btn').show();
        }
        this.titleField.focus();
    },

    // inherited docs
    updateRecord: function () {
        var dates = this.dateRangeField.getValue(),
            M = Ext.calendar.data.EventMappings,
            rec = this.activeRecord,
            fs = rec.fields,
            dirty = false;

        rec.beginEdit();

        //TODO: This block is copied directly from BasicForm.updateRecord.
        // Unfortunately since that method internally calls begin/endEdit all
        // updates happen and the record dirty status is reset internally to
        // that call. We need the dirty status, plus currently the DateRangeField
        // does not map directly to the record values, so for now we'll duplicate
        // the setter logic here (we need to be able to pick up any custom-added 
        // fields generically). Need to revisit this later and come up with a better solution.
        Ext.Array.each(fs, function (f) {
            var field = this.form.findField(f.name);
            if (field) {
                var value = field.getValue();
                if (value.getGroupValue) {
                    value = value.getGroupValue();
                }
                else if (field.eachItem) {
                    value = [];
                    field.eachItem(function (item) {
                        value.push(item.getValue());
                    });
                }
                rec.set(f.name, value);
            }
        }, this);

        rec.set(M.StartDate.name, dates[0]);
        rec.set(M.EndDate.name, dates[1]);
        rec.set(M.IsAllDay.name, dates[2]);

        dirty = rec.dirty;
        rec.endEdit();

        return dirty;
    },

    setStartDate: function (d) {
        var me = this,
            duration = me.dateRangeField.getDuration();

        me.dateRangeField.setDT(d, 'start');

        // Set the end time to keep the duration the same
        me.dateRangeField.setDT(new Date(me.dateRangeField.getDT('start').valueOf() + duration), 'end');
    },

    setEndDate: function (d) {
        this.dateRangeField.setDT(d, 'end');
    },

    // private
    onCancel: function () {
        this.cleanup(true);
        this.fireEvent('eventcancel', this, this.activeRecord);
    },

    // private
    cleanup: function (hide) {
        if (this.activeRecord && this.activeRecord.dirty) {
            this.activeRecord.reject();
        }
        delete this.activeRecord;

        if (this.form.isDirty()) {
            this.form.reset();
        }
    },

    // private
    onSave: function () {
        if (!this.form.isValid()) {
            return;
        }
        if (!this.updateRecord()) {
            this.onCancel();
            return;
        }
        this.fireEvent(this.activeRecord.phantom ? 'eventadd' : 'eventupdate', this, this.activeRecord);
    },

    // private
    onDelete: function () {
        this.fireEvent('eventdelete', this, this.activeRecord);
    }
});


Ext.define('Ext.calendar.form.EventWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.eventeditwindow',

    requires: [
        'Ext.form.Panel',
        'Ext.calendar.util.Date',
        'Ext.calendar.data.EventModel',
        'Ext.calendar.data.EventMappings'
    ],
    rtl: true,
    closeAction: "destroy",
    constructor: function (config) {
        var formPanelCfg = {
            xtype: 'form',
            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 65
            },
            frame: false,
            bodyStyle: 'background:transparent;padding:5px 10px 10px;',
            bodyBorder: false,
            border: false,
            items: [Ext.create('Ext.form.field.Text', {
                itemId: 'title',
                id: 'txtCode_Title',
                name: Ext.calendar.data.EventMappings.Title.name,
                fieldLabel: 'عنوان',
                xtype: 'textfield',
                anchor: '100%'
            }),
            {
                xtype: 'daterangefield',
                itemId: 'date-range',
                name: 'dates',
                anchor: '100%',
                fieldLabel: 'بازه کد حضور',
                labelWidth: 100

            }]
        };

        if (config.calendarStore) {
            this.calendarStore = config.calendarStore;
            delete config.calendarStore;

            formPanelCfg.items.push({
                xtype: 'calendarpicker',
                itemId: 'calendar',
                //name: Ext.calendar.data.EventMappings.CalendarId.name,
                anchor: '100%',
                store: this.calendarStore,
                allowBlank: false,
                blankText: ".این فیلد باید پر باشد",
                listeners: {
                    select: {
                        fn: function (item, records) {
                            formPanelCfg.items[0].setValue(records[0].data.Title)
                        }
                    }
                }
            });

            formPanelCfg.items.push({
                xtype: 'radiogroup',
                fieldLabel: 'تعطیل',
                id: 'rbg_IsVacation',
                // Arrange radio buttons into two columns, distributed vertically
                columns: 3,
                vertical: false,
                items: [
                    { boxLabel: 'روز عادی', name: 'value', inputValue: '0', checked: true},
                    { boxLabel: 'تعطیل رسمی', name: 'value', inputValue: '1' },
                    { boxLabel: 'تعطیل غیر رسمی', name: 'value', inputValue: '2'}
                ]
            });
        }

        this.callParent([Ext.apply({

            titleTextAdd: 'انتخاب کد حضور جدید',
            titleTextEdit: 'تغییر کد حضور',
            width: 600,
            autocreate: true,
            border: true,
            closeAction: 'hide',
            modal: false,
            resizable: false,
            buttonAlign: 'left',
            savingMessage: 'در حال ذخیره کد حضور...',
            deletingMessage: 'در حال حذف کد حضور...',
            layout: 'fit',

            defaultFocus: 'title',
            onEsc: function (key, event) {
                event.target.blur(); // Remove the focus to avoid doing the validity checks when the window is shown again.
                this.onCancel();
            },

            fbar: [{
                xtype: 'tbtext',
                text: '<a href="#" id="tblink">Edit Details...</a>'
            },
                '->',
            /*{
                itemId: 'delete-btn',
                text: 'حذف کد حضور',
                disabled: false,
                handler: this.onDelete,
                scope: this,
                minWidth: 150,
                hideMode: 'offsets'
            }*/,
            {
                text: 'ذخیره',
                disabled: false,
                handler: this.onSave,
                scope: this
            },
            {
                text: 'بستن',
                disabled: false,
                handler: this.onCancel,
                scope: this
            }],
            items: formPanelCfg
        },
            config)]);
    },

    // private
    newId: -10000,
    // private
    initComponent: function () {
        this.callParent();

        this.formPanel = this.items.items[0];
    },

    // private
    afterRender: function () {
        this.callParent();

        this.el.addCls('ext-cal-event-win');

        Ext.get('tblink').on('click', this.onEditDetailsClick, this);

        this.titleField = this.down('#title');
        this.dateRangeField = this.down('#date-range');
        this.calendarField = this.down('#calendar');
        this.deleteButton = this.down('#delete-btn');
    },

    // private
    onEditDetailsClick: function (e) {
        e.stopEvent();
        this.updateRecord(this.activeRecord, true);
        this.fireEvent('editdetails', this, this.activeRecord, this.animateTarget);
    },


    show: function (o, animateTarget) {
        // Work around the CSS day cell height hack needed for initial render in IE8/strict:
        var me = this,
            anim = (Ext.isIE8 && Ext.isStrict) ? null : animateTarget,
            M = Ext.calendar.data.EventMappings,
            data = {};

        this.callParent([anim, function () {
            me.titleField.focus(false, 100);
        }]);

        //this.deleteButton[o.data && o.data[M.EventId.name] ? 'show' : 'hide']();

        var rec,
            f = this.formPanel.form;

        if (o.data) {
            rec = o;
            this.setTitle(rec.phantom ? this.titleTextAdd : this.titleTextEdit);
            //o.data.StartDate = new persianDate(dateToArray(o.data.start))
            //o.data.EndDate = new persianDate(dateToArray(o.data.end))
           // f.loadRecord(rec);
        }
        else {
            this.setTitle(this.titleTextAdd);

            var start = o[M.StartDate.name],
                end = o[M.EndDate.name] || Ext.calendar.util.Date.add(start, { hours: 1 });

            data[M.StartDate.name] = start;
            data[M.EndDate.name] = end;
            //data[M.EventId.name] = this.newId--;
            data[M.IsAllDay.name] = !!o[M.IsAllDay.name] || start.date() != Ext.calendar.util.Date.add(end, { millis: 1 }).date();
            rec = new Ext.calendar.data.EventModel(data);
            rec.data.StartDate = start
            rec.data.EndDate = end
            f.reset();
            f.loadRecord(rec);
        }

        //if (this.calendarStore) {
        //    this.calendarField.setValue(rec.data[M.CalendarId.name]);
        //}
        this.dateRangeField.setValue(rec.data);
        this.activeRecord = rec;

        return this;
    },

    // private
    roundTime: function (dt, incr) {
        incr = incr || 15;
        var m = parseInt(dt.getMinutes(), 10);
        return dt.add('mi', incr - (m % incr));
    },

    // private
    onCancel: function () {
        this.cleanup(true);
        this.fireEvent('eventcancel', this);
    },

    // private
    cleanup: function (hide) {
        if (this.activeRecord && this.activeRecord.dirty) {
            this.activeRecord.reject();
        }
        delete this.activeRecord;

        if (hide === true) {
            // Work around the CSS day cell height hack needed for initial render in IE8/strict:
            //var anim = afterDelete || (Ext.isIE8 && Ext.isStrict) ? null : this.animateTarget;
            this.hide();
        }
    },

    // private
    updateRecord: function (record, keepEditing) {
        var fields = record.getFields(),
            values = this.formPanel.getForm().getValues(),
            name,
            M = Ext.calendar.data.EventMappings,
            obj = {};

        Ext.Array.each(fields, function (f) {
            name = f.name;
            if (name in values) {
                obj[name] = values[name];
            }
        });

        var dates = this.dateRangeField.getValue();
        obj[M.StartDate.name] = dates[0];
        obj[M.EndDate.name] = dates[1];
        obj[M.IsAllDay.name] = dates[2];

        record.beginEdit();
        record.set(obj);

        if (!keepEditing) {
            record.endEdit();
        }

        return this;
    },

    // private
    onSave: function () {

        if (!this.formPanel.form.isValid()) {
            return;
        }
        if (!this.updateRecord(this.activeRecord)) {
            this.onCancel();
            return;
        }

        var start = this.down('daterangefield').items.items[0].value
        var end = this.down('daterangefield').items.items[1].value
        var codeId = this.down('calendarpicker').value
        var isVac = this.down('#rbg_IsVacation').getValue().value
        this.activeRecord.data.CodeID = codeId
        this.activeRecord.data.StartDate = new persianDate(dateToArray(start))
        this.activeRecord.data.EndDate = new persianDate(dateToArray(end))
        this.activeRecord.data.IsVacation = parseInt(isVac)
        
        this.fireEvent(this.activeRecord.phantom ? 'eventadd' : 'eventupdate', this, this.activeRecord, this.animateTarget);

        // Clear phantom and modified states.
        this.activeRecord.commit();
    },

    // private
    onDelete: function () {
        this.fireEvent('eventdelete', this, this.activeRecord, this.animateTarget);
    }
});
Ext.define('Ext.calendar.template.BoxLayout', {
    extend: 'Ext.XTemplate',

    requires: ['Ext.calendar.util.Date'],

    constructor: function (config) {

        Ext.apply(this, config);

        var weekLinkTpl = this.showWeekLinks ? '<div id="{weekLinkId}" class="ext-cal-week-link">{weekNum}</div>' : '';

        this.callParent([
            '<tpl for="weeks">',
            '<div id="{[this.id]}-wk-{[xindex-1]}" class="ext-cal-wk-ct" style="top:{[this.getRowTop(xindex, xcount)]}%; height:{[this.getRowHeight(xcount)]}%;">',
            weekLinkTpl,
            '<table class="ext-cal-bg-tbl" cellpadding="0" cellspacing="0">',
            '<tbody>',
            '<tr>',
            '<tpl for=".">',
            '<td id="{[this.id]}-day-{dayDate}" class="{cellCls}">&#160;</td>',
            '</tpl>',
            '</tr>',
            '</tbody>',
            '</table>',
            '<table class="ext-cal-evt-tbl" cellpadding="0" cellspacing="0">',
            '<tbody>',
            '<tr>',
            '<tpl for=".">',
            '<td id="{[this.id]}-ev-day-{dayDate}" class="{titleCls}"><div>{title}</div></td>',
            '</tpl>',
            '</tr>',
            '</tbody>',
            '</table>',
            '</div>',
            '</tpl>', {
                getRowTop: function (i, ln) {
                    return ((i - 1) * (100 / ln));
                },
                getRowHeight: function (ln) {
                    return 100 / ln;
                }
            }
        ]);
    },

    applyTemplate: function (o) {

        Ext.apply(this, o);

        var w = 0, title = '', first = true, isToday = false, showMonth = false, prevMonth = false, nextMonth = false,
            weeks = [[]],
            today = Ext.calendar.util.Date.today(),
            dt = this.viewStart.clone()/*Ext.Date.clone(this.viewStart)*/,

            thisMonth = this.startDate.month();//this.startDate.getMonth();

        for (; w < this.weekCount || this.weekCount == -1; w++) {
            if (dt > this.viewEnd) {
                break;
            }
            weeks[w] = [];

            for (var d = 0; d < this.dayCount; d++) {
                isToday = Ext.calendar.util.Date.equalDates(dt, today);
                showMonth = first || (dt.date() == 1)/*(dt.getDate() == 1)*/;
                prevMonth = (dt.month() < thisMonth) && this.weekCount == -1;
                nextMonth = (dt.month() > thisMonth) && this.weekCount == -1;

                if (dt.day() == 1) {
                    // The ISO week format 'W' is relative to a Monday week start. If we
                    // make this check on Sunday the week number will be off.
                    weeks[w].weekNum = this.showWeekNumbers ? dt.format('w')/*Ext.Date.format(dt, 'W')*/ : '&#160;';
                    weeks[w].weekLinkId = 'ext-cal-week-' + dt.valueOf()//Ext.Date.format(dt, 'Ymd');
                }

                if (showMonth) {
                    if (isToday) {
                        title = this.getTodayText();
                    }
                    else {
                        //title = Ext.Date.format(dt, this.dayCount == 1 ? 'l, F j, Y' : (first ? 'M j, Y' : 'M j'));
                        title = dt.format(this.dayCount == 1 ? 'LL' : (first ? 'LLLL' : 'LL'));
                    }
                }
                else {
                    //var dayFmt = (w == 0 && this.showHeader !== true) ? 'D j' : 'j';
                    var dayFmt = (w == 0 && this.showHeader !== true) ? 'LLLL' : 'LL';
                    title = isToday ? this.getTodayText() : dt.format(dayFmt);//Ext.Date.format(dt, dayFmt);
                }

                weeks[w].push({
                    title: title,
                    date: dt.clone(),//Ext.Date.clone(dt),
                    dayDate: replace(farsiToEnglish(dt.format('L')), '/', '', false),
                    titleCls: 'ext-cal-dtitle ' + (isToday ? ' ext-cal-dtitle-today' : '') +
                    (w == 0 ? ' ext-cal-dtitle-first' : '') +
                    (prevMonth ? ' ext-cal-dtitle-prev' : '') +
                    (nextMonth ? ' ext-cal-dtitle-next' : ''),
                    cellCls: 'ext-cal-day ' + (isToday ? ' ext-cal-day-today' : '') +
                    (d == 0 ? ' ext-cal-day-first' : '') +
                    (prevMonth ? ' ext-cal-day-prev' : '') +
                    (nextMonth ? ' ext-cal-day-next' : '')
                });
                dt.hours(1);
                //dt = Ext.calendar.util.Date.add(dt, { hours: 26 });
                dt = Ext.calendar.util.Date.add(dt, { days: 1 });
                first = false;
            }
        }

        var ret = this.applyOut({
            weeks: weeks
        }, []).join('');

        return ret

    },

    getTodayText: function () {
        var dt = new persianDate().format('LL'),
            fmt,
            todayText = this.showTodayText !== false ? this.todayText : '',
            timeText = this.showTime !== false ? '<br/><span id="' + this.id + '-clock" class="ext-cal-dtitle-time">' +
                Ext.Date.format(new Date(), 'g:i a') + '</span>' : '',
            separator = todayText.length > 0 || timeText.length > 0 ? ' &mdash; ' : '';

        return todayText + ' - ' + dt + timeText;
        //if (this.dayCount == 1) {
        //    return dt + separator + todayText + timeText;
        //}
        //fmt = this.weekCount == 1 ? 'D j' : 'j';
        //return todayText.length > 0 ? todayText + timeText : new persianDate().format('LL') + timeText;
    }
},
    function () {
        this.createAlias('apply', 'applyTemplate');
    });

Ext.define('Ext.calendar.template.DayBody', {
    extend: 'Ext.XTemplate',

    constructor: function (config) {

        Ext.apply(this, config);

        this.callParent([
            '<table class="ext-cal-bg-tbl" cellspacing="0" cellpadding="0">',
            '<tbody>',
            '<tr height="1">',
            '<td class="ext-cal-gutter"></td>',
            '<td colspan="{dayCount}">',
            '<div class="ext-cal-bg-rows">',
            '<div class="ext-cal-bg-rows-inner">',
            '<tpl for="times">',
            '<div class="ext-cal-bg-row">',
            '<div class="ext-cal-bg-row-div ext-row-{[xindex]}"></div>',
            '</div>',
            '</tpl>',
            '</div>',
            '</div>',
            '</td>',
            '</tr>',
            '<tr>',
            '<td class="ext-cal-day-times">',
            '<tpl for="times">',
            '<div class="ext-cal-bg-row">',
            '<div class="ext-cal-day-time-inner">{.}</div>',
            '</div>',
            '</tpl>',
            '</td>',
            '<tpl for="days">',
            '<td class="ext-cal-day-col">',
            '<div class="ext-cal-day-col-inner">',
            '<div id="{[this.id]}-day-col-{.:date("Ymd")}" class="ext-cal-day-col-gutter"></div>',
            '</div>',
            '</td>',
            '</tpl>',
            '</tr>',
            '</tbody>',
            '</table>'
        ]);
    },

    // private
    applyTemplate: function (o) {
        this.today = Ext.calendar.util.Date.today();
        this.dayCount = this.dayCount || 1;

        var i = 0,
            days = [],
            dt = o.viewStart.clone()//Ext.Date.clone(o.viewStart),
        times = [];

        for (; i < this.dayCount; i++) {
            days[i] = Ext.calendar.util.Date.add(dt, { days: i });
        }

        // use a fixed DST-safe date so times don't get skipped on DST boundaries
        dt = Ext.Date.clearTime(new Date('5/26/1972'));

        for (i = 0; i < 24; i++) {
            times.push(Ext.Date.format(dt, 'ga'));
            dt = Ext.calendar.util.Date.add(dt, { hours: 1 });
        }

        var ret = this.applyOut({
            days: days,
            dayCount: days.length,
            times: times
        }, []).join('');

        return ret
    },

    apply: function (values) {
        return this.applyTemplate.apply(this, arguments);
    }
});

Ext.define('Ext.calendar.template.DayHeader', {
    extend: 'Ext.XTemplate',

    requires: ['Ext.calendar.template.BoxLayout'],

    constructor: function (config) {

        Ext.apply(this, config);

        this.allDayTpl = new Ext.calendar.template.BoxLayout(config);
        this.allDayTpl.compile();

        this.callParent([
            '<div class="ext-cal-hd-ct">',
            '<table class="ext-cal-hd-days-tbl" cellspacing="0" cellpadding="0">',
            '<tbody>',
            '<tr>',
            '<td class="ext-cal-gutter"></td>',
            '<td class="ext-cal-hd-days-td"><div class="ext-cal-hd-ad-inner">{allDayTpl}</div></td>',
            '<td class="ext-cal-gutter-rt"></td>',
            '</tr>',
            '</tobdy>',
            '</table>',
            '</div>'
        ]);
    },

    applyTemplate: function (o) {
        return this.applyOut({
            allDayTpl: this.allDayTpl.apply(o)
        }, []).join('');
    },

    apply: function (values) {
        return this.applyTemplate.apply(this, arguments);
    }
});

Ext.define('Ext.calendar.template.Month', {
    extend: 'Ext.XTemplate',

    requires: ['Ext.calendar.template.BoxLayout'],

    constructor: function (config) {

        Ext.apply(this, config);

        this.weekTpl = new Ext.calendar.template.BoxLayout(config);
        this.weekTpl.compile();

        var weekLinkTpl = this.showWeekLinks ? '<div class="ext-cal-week-link-hd">&#160;</div>' : '';

        this.callParent([
            '<div class="ext-cal-inner-ct {extraClasses}">',
            '<div class="ext-cal-hd-ct ext-cal-month-hd">',
            weekLinkTpl,
            '<table class="ext-cal-hd-days-tbl" cellpadding="0" cellspacing="0">',
            '<tbody>',
            '<tr>',
            '<tpl for="days">',
            '<th class="ext-cal-hd-day{[xindex==1 ? " ext-cal-day-first" : ""]}" title="{.:format("LL")}">{dayName}</th>',
            '</tpl>',
            '</tr>',
            '</tbody>',
            '</table>',
            '</div>',
            '<div class="ext-cal-body-ct">{weeks}</div>',
            '</div>'
        ]);
    },

    // private
    applyTemplate: function (o) {
        var days = [],
            weeks = this.weekTpl.apply(o),
            dt = o.viewStart,
            D = Ext.calendar.util.Date;

        for (var i = 0; i < 7; i++) {
            days.push({ date: D.add(dt, { days: i }), dayName: '' });
        }

        days.forEach(function (date) { date.dayName = date.date.format('dddd') })

        var extraClasses = this.showHeader === true ? '' : 'ext-cal-noheader';
        if (this.showWeekLinks) {
            extraClasses += ' ext-cal-week-links';
        }

        var ret = this.applyOut({
            days: days,
            weeks: weeks,
            extraClasses: extraClasses
        }, []).join('');

        return ret


    },

    apply: function (values) {
        return this.applyTemplate.apply(this, arguments);
    }
});

Ext.define('Ext.calendar.view.AbstractCalendar', {
    extend: 'Ext.Component',
    alias: 'widget.calendarview',

    requires: [
        'Ext.calendar.util.Date',
        'Ext.calendar.data.EventMappings'
    ],


    startDay: 1,//change:0

    spansHavePriority: false,

    trackMouseOver: true,

    enableFx: true,

    enableAddFx: true,

    enableUpdateFx: false,

    enableRemoveFx: true,

    enableDD: true,

    monitorResize: true,

    ddCreateEventText: 'Create event for {0}',

    ddMoveEventText: 'Move event to {0}',

    ddResizeEventText: 'Update event to {0}',

    //private properties -- do not override:
    weekCount: 1,
    dayCount: 1,
    eventSelector: '.ext-cal-evt',
    eventOverClass: 'ext-evt-over',
    eventElIdDelimiter: '-evt-',
    dayElIdDelimiter: '-day-',


    getEventBodyMarkup: Ext.emptyFn,
    // must be implemented by a subclass

    getEventTemplate: Ext.emptyFn,

    // must be implemented by a subclass
    // private
    initComponent: function () {
        this.setStartDate(this.startDate || new persianDate());

        this.callParent(arguments);
    },

    // private
    afterRender: function () {
        this.callParent(arguments);

        this.renderTemplate();

        if (this.store) {
            this.setStore(this.store, true);
        }

        this.el.on({
            'mouseover': this.onMouseOver,
            'mouseout': this.onMouseOut,
            'click': this.onClick,
            scope: this
        });

        this.el.unselectable();

        if (this.enableDD && this.readOnly !== true && this.initDD) {
            this.initDD();
        }

        this.on('eventsrendered', this.forceSize);
        Ext.defer(this.forceSize, 100, this);

    },

    // private
    forceSize: function () {
        if (this.el && this.el.down) {
            var hd = this.el.down('.ext-cal-hd-ct'),
                bd = this.el.down('.ext-cal-body-ct');

            if (bd == null || hd == null) {
                return;
            }

            var headerHeight = hd.getHeight(),
                sz = this.el.parent().getSize();

            bd.setHeight(sz.height - headerHeight);
        }
    },

    refresh: function () {
        this.prepareData();
        this.renderTemplate();
        this.renderItems();
    },

    getWeekCount: function () {
        var days = Ext.calendar.util.Date.diffDays(this.viewStart, this.viewEnd);
        return Math.ceil(days / this.dayCount);
    },

    // private
    prepareData: function () {
        var lastInMonth = this.startDate.endOf("month"),//Ext.Date.getLastDateOfMonth(this.startDate),
            w = 0, d,
            dt = this.viewStart.clone(),//Ext.Date.clone(this.viewStart),
            weeks = this.weekCount < 1 ? 6 : this.weekCount;

        //dt.hours(1);
        //lastInMonth.setHours(1);
        dt.hour(1);
        lastInMonth.hour(1);

        this.eventGrid = [[]];
        this.allDayGrid = [[]];
        this.evtMaxCount = [];

        var evtsInView = this.store.queryBy(function (rec) {

            rec.data.StartDate = isPersianDate(rec.data.StartDate) ? rec.data.StartDate : new persianDate(dateToArray(rec.data.StartDate))
            rec.data.EndDate = isPersianDate(rec.data.EndDate) ? rec.data.EndDate : new persianDate(dateToArray(rec.data.EndDate))

            //rec.data.StartDate = isNullOrEmpty(rec.data.StartDate) ? new persianDate(dateToArray(rec.data.start)) : rec.data.StartDate;
            //rec.data.EndDate = isNullOrEmpty(rec.data.EndDate) ? new persianDate(dateToArray(rec.data.end)) : rec.data.EndDate;
            return this.isEventVisible(rec.data);
        },
            this);

        for (; w < weeks; w++) {
            this.evtMaxCount[w] = 0;
            if (this.weekCount == -1 && dt > lastInMonth) {
                //current week is fully in next month so skip
                break;
            }
            this.eventGrid[w] = this.eventGrid[w] || [];
            this.allDayGrid[w] = this.allDayGrid[w] || [];

            for (d = 0; d < this.dayCount; d++) {
                if (evtsInView.getCount() > 0) {
                    var evts = evtsInView.filterBy(function (rec) {
                        var startDt = rec.data[Ext.calendar.data.EventMappings.StartDate.name],
                            startsOnDate = Ext.calendar.util.Date.equalDates(dt, rec.data[Ext.calendar.data.EventMappings.StartDate.name]);
                        spansFromPrevView = (w == 0 && d == 0 && (dt > rec.data[Ext.calendar.data.EventMappings.StartDate.name]));

                        return startsOnDate || spansFromPrevView;
                    },
                        this);

                    this.sortEventRecordsForDay(evts);
                    this.prepareEventGrid(evts, w, d);
                }
                dt = Ext.calendar.util.Date.add(dt, { days: 1 });
            }
        }
        this.currentWeekCount = w;
    },

    // private
    prepareEventGrid: function (evts, w, d) {
        var me = this,
            row = 0,
            max = me.maxEventsPerDay ? me.maxEventsPerDay : 999;

        evts.each(function (evt) {
            var M = Ext.calendar.data.EventMappings,
                days = Ext.calendar.util.Date.diffDays(
                    Ext.calendar.util.Date.max(me.viewStart, evt.data[M.StartDate.name]),
                    Ext.calendar.util.Date.min(me.viewEnd, evt.data[M.EndDate.name])) + 1;

            if (days > 1 || Ext.calendar.util.Date.diffDays(evt.data[M.StartDate.name], evt.data[M.EndDate.name]) > 1) {
                me.prepareEventGridSpans(evt, me.eventGrid, w, d, days);
                me.prepareEventGridSpans(evt, me.allDayGrid, w, d, days, true);
            } else {
                row = me.findEmptyRowIndex(w, d);
                me.eventGrid[w][d] = me.eventGrid[w][d] || [];
                me.eventGrid[w][d][row] = evt;

                if (evt.data[M.IsAllDay.name]) {
                    row = me.findEmptyRowIndex(w, d, true);
                    me.allDayGrid[w][d] = me.allDayGrid[w][d] || [];
                    me.allDayGrid[w][d][row] = evt;
                }
            }

            if (me.evtMaxCount[w] < me.eventGrid[w][d].length) {
                me.evtMaxCount[w] = Math.min(max + 1, me.eventGrid[w][d].length);
            }
            return true;
        });
    },

    // private
    prepareEventGridSpans: function (evt, grid, w, d, days, allday) {
        // this event spans multiple days/weeks, so we have to preprocess
        // the events and store special span events as placeholders so that
        // the render routine can build the necessary TD spans correctly.
        var w1 = w,
            d1 = d,
            row = this.findEmptyRowIndex(w, d, allday),
            dt = this.viewStart.clone()//Ext.Date.clone(this.viewStart);
        //dt.hours(1);
        dt.hour(1);
        var start = {
            event: evt,
            isSpan: true,
            isSpanStart: true,
            spanLeft: false,
            spanRight: (d == 6)
        };
        grid[w][d] = grid[w][d] || [];
        grid[w][d][row] = start;

        while (--days) {
            dt = Ext.calendar.util.Date.add(dt, { days: 1 });
            if (dt > this.viewEnd) {
                break;
            }
            if (++d1 > 6) {
                // reset counters to the next week
                d1 = 0;
                w1++;
                row = this.findEmptyRowIndex(w1, 0);
            }
            grid[w1] = grid[w1] || [];
            grid[w1][d1] = grid[w1][d1] || [];

            grid[w1][d1][row] = {
                event: evt,
                isSpan: true,
                isSpanStart: (d1 == 0),
                spanLeft: (w1 > w) && (d1 % 7 == 0),
                spanRight: (d1 == 6) && (days > 1)
            };
        }
    },

    // private
    findEmptyRowIndex: function (w, d, allday) {
        var grid = allday ? this.allDayGrid : this.eventGrid,
            day = grid[w] ? grid[w][d] || [] : [],
            i = 0,
            ln = day.length;

        for (; i < ln; i++) {
            if (day[i] == null) {
                return i;
            }
        }
        return ln;
    },

    // private
    renderTemplate: function () {
        if (this.tpl) {
            this.el.select('*').destroy();
            this.tpl.overwrite(this.el, this.getParams());
            this.lastRenderStart = this.viewStart.clone();//Ext.Date.clone(this.viewStart);
            this.lastRenderEnd = this.viewEnd.clone();// Ext.Date.clone(this.viewEnd);
        }
    },

    disableStoreEvents: function () {
        this.monitorStoreEvents = false;
    },

    enableStoreEvents: function (refresh) {
        this.monitorStoreEvents = true;
        if (refresh === true) {
            this.refresh();
        }
    },

    // private
    onResize: function () {
        this.callParent(arguments);
        this.refresh();
    },

    // private
    onInitDrag: function () {
        this.fireEvent('initdrag', this);
    },

    // private
    onEventDrop: function (rec, dt) {
        if (Ext.calendar.util.Date.compare(rec.data[Ext.calendar.data.EventMappings.StartDate.name], dt) === 0) {
            // no changes
            return;
        }
        var diff = dt.valueOf() - rec.data[Ext.calendar.data.EventMappings.StartDate.name].valueOf();
        rec.set(Ext.calendar.data.EventMappings.StartDate.name, dt);
        rec.set(Ext.calendar.data.EventMappings.EndDate.name, Ext.calendar.util.Date.add(rec.data[Ext.calendar.data.EventMappings.EndDate.name], { millis: diff }));

        this.fireEvent('eventmove', this, rec);
    },

    // private
    onCalendarEndDrag: function (start, end, onComplete) {
        if (start && end) {
            // set this flag for other event handlers that might conflict while we're waiting
            this.dragPending = true;

            // have to wait for the user to save or cancel before finalizing the dd interation
            var o = {};
            o[Ext.calendar.data.EventMappings.StartDate.name] = start;
            o[Ext.calendar.data.EventMappings.EndDate.name] = end;

            this.fireEvent('rangeselect', this, o, Ext.bind(this.onCalendarEndDragComplete, this, [onComplete]));
        }
    },

    // private
    onCalendarEndDragComplete: function (onComplete) {
        // callback for the drop zone to clean up
        onComplete();
        // clear flag for other events to resume normally
        this.dragPending = false;
    },

    // private
    onUpdate: function (ds, rec, operation) {
        if (this.monitorStoreEvents === false) {
            return;
        }
        if (operation == Ext.data.Record.COMMIT) {
            this.refresh();
            if (this.enableFx && this.enableUpdateFx) {
                this.doUpdateFx(this.getEventEls(rec.data[Ext.calendar.data.EventMappings.EventId.name]), {
                    scope: this
                });
            }
        }
    },


    doUpdateFx: function (els, o) {
        this.highlightEvent(els, null, o);
    },

    // private
    onAdd: function (ds, records, index) {
        if (this.monitorStoreEvents === false) {
            return;
        }
        var rec = records[0];
        this.tempEventId = rec.id;
        this.refresh();

        if (this.enableFx && this.enableAddFx) {
            this.doAddFx(this.getEventEls(rec.data[Ext.calendar.data.EventMappings.EventId.name]), {
                scope: this
            });
        }
    },

    doAddFx: function (els, o) {
        els.fadeIn(Ext.apply(o, {
            duration: 2000
        }));
    },

    // private
    onRemove: function (ds, recs) {
        var name = Ext.calendar.data.EventMappings.EventId.name,
            i, len, rec, els;

        if (this.monitorStoreEvents === false) {
            return;
        }

        for (i = 0, len = recs.length; i < len; i++) {
            rec = recs[i];

            if (this.enableFx && this.enableRemoveFx) {
                els = this.getEventEls(rec.get(name));

                if (els.getCount() > 0) {
                    this.doRemoveFx(els, {
                        remove: true,
                        scope: this,
                        callback: this.refresh
                    });
                }
            }
            else {
                this.getEventEls(rec.get(name)).remove();
                this.refresh();
            }
        }
    },

    doRemoveFx: function (els, o) {
        els.fadeOut(o);
    },


    highlightEvent: function (els, color, o) {
        if (this.enableFx) {
            var c;
            !(Ext.isIE || Ext.isOpera) ?
                els.highlight(color, o) :
                // Fun IE/Opera handling:
                els.each(function (el) {
                    el.highlight(color, Ext.applyIf({
                        attr: 'color'
                    },
                        o));
                    c = el.down('.ext-cal-evm');
                    if (c) {
                        c.highlight(color, o);
                    }
                },
                    this);
        }
    },


    getEventIdFromEl: function (el) {
        el = Ext.get(el);

        var parts,
            id = '',
            cls,
            classes = el.dom.className.split(' ');

        Ext.each(classes, function (cls) {
            parts = cls.split(this.eventElIdDelimiter);
            if (parts.length > 1) {
                id = parts[1];
                return false;
            }
        }, this);

        return id;
    },

    // private
    getEventId: function (eventId) {
        if (eventId === undefined && this.tempEventId) {
            eventId = this.tempEventId;
        }
        return eventId;
    },


    getEventSelectorCls: function (eventId, forSelect) {
        var prefix = forSelect ? '.' : '';
        return prefix + this.id + this.eventElIdDelimiter + this.getEventId(eventId);
    },


    getEventEls: function (eventId) {
        var els = Ext.select(this.getEventSelectorCls(this.getEventId(eventId), true), false, this.el.id);
        return new Ext.CompositeElement(els);
    },


    isToday: function () {
        //var today = Ext.Date.clearTime(new Date()).valueOf();
        //return this.viewStart.valueOf() <= today && this.viewEnd.valueOf() >= today;
        var today = new persianDate()
        return this.viewStart.isSameMonth(today) && this.viewEnd.isSameMonth(today)
    },

    // private
    onDataChanged: function (store) {
        if (this.startDate) {
            this.setStartDate(this.startDate, false, false);
        }
        this.refresh();
    },

    // private
    isEventVisible: function (evt) {
        var M = Ext.calendar.data.EventMappings,
            data = evt.data || evt,
            start = this.viewStart.valueOf(),
            end = this.viewEnd.valueOf(),
            evStart = data[M.StartDate.name].valueOf(),
            evEnd = data[M.EndDate.name].valueOf();
        evEnd = Ext.calendar.util.Date.add(data[M.EndDate.name], { seconds: -1 }).valueOf();

        return this.rangesOverlap(start, end, evStart, evEnd);
    },

    rangesOverlap: function (start1, end1, start2, end2) {
        var startsInRange = (start1 >= start2 && start1 <= end2),
            endsInRange = (end1 >= start2 && end1 <= end2),
            spansRange = (start1 <= start2 && end1 >= end2);

        return (startsInRange || endsInRange || spansRange);
    },

    // private
    isOverlapping: function (evt1, evt2) {
        var ev1 = evt1.data ? evt1.data : evt1,
            ev2 = evt2.data ? evt2.data : evt2,
            M = Ext.calendar.data.EventMappings,
            start1 = ev1[M.StartDate.name].valueOf(),
            end1 = Ext.calendar.util.Date.add(ev1[M.EndDate.name], { seconds: -1 }).valueOf(),
            start2 = ev2[M.StartDate.name].valueOf(),
            end2 = Ext.calendar.util.Date.add(ev2[M.EndDate.name], { seconds: -1 }).valueOf();

        if (end1 < start1) {
            end1 = start1;
        }
        if (end2 < start2) {
            end2 = start2;
        }

        return (start1 <= end2 && end1 >= start2);
    },

    getDayEl: function (dt) {
        return Ext.get(this.getDayId(dt));
    },

    getDayId: function (dt) {
        if (Ext.isDate(dt)) {
            dt = Ext.Date.format(dt, 'Ymd');
        }
        return this.id + this.dayElIdDelimiter + dt;
    },


    getStartDate: function () {
        return this.startDate;
    },


    setStartDate: function (start, refresh, reload) {
        //this.startDate = Ext.Date.clearTime(start);
        this.startDate = start;
        this.setViewBounds(start);
        if (reload) {
            this.store.load({
                params: {
                    //start: Ext.Date.format(this.viewStart, 'm-d-Y'),
                    //end: Ext.Date.format(this.viewEnd, 'm-d-Y')
                    start: this.viewStart.format('L'),
                    end: this.viewEnd.format('L')
                }
            });
        }
        if (refresh === true) {
            this.refresh();
        }
        this.fireEvent('datechange', this, this.startDate, this.viewStart, this.viewEnd);
    },

    // private
    setViewBounds: function (startDate) {
        var me = this,
            start = startDate || me.startDate,
            //offset = start.getDay() - me.startDay,
            offset = start.day() - me.startDay,
            Dt = Ext.calendar.util.Date;

        if (offset < 0) {
            // if the offset is negative then some days will be in the previous week so add a week to the offset
            offset += 7;
        }

        switch (this.weekCount) {
            case 0:
            case 1:
                me.viewStart = me.dayCount < 7 && !me.startDayIsStatic ?
                    start : Dt.add(start, {
                        days: -offset,
                        clearTime: true
                    });
                me.viewEnd = Dt.add(me.viewStart, {
                    days: me.dayCount || 7,
                    seconds: -1
                });
                return;

            case -1:
                // auto by month
                start = start.startOf('month')//Ext.Date.getFirstDateOfMonth(start);
                offset = start.day() - me.startDay;//start.getDay() - me.startDay;
                if (offset < 0) {
                    // if the offset is negative then some days will be in the previous week so add a week to the offset
                    offset += 7;
                }
                me.viewStart = Dt.add(start, {
                    days: -offset,
                    clearTime: true
                });

                // start from current month start, not view start:
                var end = Dt.add(start, {
                    months: 1,
                    seconds: -1
                });

                // fill out to the end of the week:
                offset = me.startDay;
                if (offset > end.day()/*end.getDay()*/) {
                    // if the offset is larger than the end day index then the last row will be empty so skip it
                    offset -= 7;
                }

                me.viewEnd = Dt.add(end, {
                    //days: 6 - end.getDay() + offset
                    days: 6 - end.day() + offset
                });
                return;

            default:
                me.viewStart = Dt.add(start, {
                    days: -offset,
                    clearTime: true
                });
                me.viewEnd = Dt.add(me.viewStart, {
                    days: me.weekCount * 7,
                    seconds: -1
                });
        }
    },

    // private
    getViewBounds: function () {
        return {
            start: this.viewStart,
            end: this.viewEnd
        };
    },


    sortEventRecordsForDay: function (evts) {
        if (evts.length < 2) {
            return;
        }
        evts.sortBy(Ext.bind(function (evtA, evtB) {
            var a = evtA.data,
                b = evtB.data,
                M = Ext.calendar.data.EventMappings;

            // Always sort all day events before anything else
            if (a[M.IsAllDay.name]) {
                return - 1;
            }
            else if (b[M.IsAllDay.name]) {
                return 1;
            }
            if (this.spansHavePriority) {
                // This logic always weights span events higher than non-span events
                // (at the possible expense of start time order). This seems to
                // be the approach used by Google calendar and can lead to a more
                // visually appealing layout in complex cases, but event order is
                // not guaranteed to be consistent.
                var diff = Ext.calendar.util.Date.diffDays;
                if (diff(a[M.StartDate.name], a[M.EndDate.name]) > 0) {
                    if (diff(b[M.StartDate.name], b[M.EndDate.name]) > 0) {
                        // Both events are multi-day
                        if (a[M.StartDate.name].valueOf() == b[M.StartDate.name].valueOf()) {
                            // If both events start at the same time, sort the one
                            // that ends later (potentially longer span bar) first
                            return b[M.EndDate.name].valueOf() - a[M.EndDate.name].valueOf();
                        }
                        return a[M.StartDate.name].valueOf() - b[M.StartDate.name].valueOf();
                    }
                    return - 1;
                }
                else if (diff(b[M.StartDate.name], b[M.EndDate.name]) > 0) {
                    return 1;
                }
                return a[M.StartDate.name].valueOf() - b[M.StartDate.name].valueOf();
            }
            else {
                // Doing this allows span and non-span events to intermingle but
                // remain sorted sequentially by start time. This seems more proper
                // but can make for a less visually-compact layout when there are
                // many such events mixed together closely on the calendar.
                return a[M.StartDate.name].valueOf() - b[M.StartDate.name].valueOf();
            }
        }, this));
    },


    moveTo: function (dt, noRefresh, reload) {
        if (isPersianDate(dt)/*Ext.isDate(dt)*/) {
            this.setStartDate(dt, undefined, reload);
            if (noRefresh !== false) {
                this.refresh();
            }
            return this.startDate;
        }
        return dt;
    },


    moveNext: function (noRefresh, reload) {
        return this.moveTo(Ext.calendar.util.Date.add(this.viewEnd, { days: 1 }), noRefresh, reload);
    },


    movePrev: function (noRefresh, reload) {
        var days = Ext.calendar.util.Date.diffDays(this.viewStart, this.viewEnd) + 1;
        return this.moveDays(- days, noRefresh, reload);
    },


    moveMonths: function (value, noRefresh, reload) {
        return this.moveTo(Ext.calendar.util.Date.add(this.startDate, { months: value }), noRefresh, reload);
    },


    moveWeeks: function (value, noRefresh, reload) {
        return this.moveTo(Ext.calendar.util.Date.add(this.startDate, { days: value * 7 }), noRefresh, reload);
    },


    moveDays: function (value, noRefresh, reload) {
        return this.moveTo(Ext.calendar.util.Date.add(this.startDate, { days: value }), noRefresh, reload);
    },


    moveToday: function (noRefresh, reload) {
        return this.moveTo(new Date(), noRefresh, reload);
    },


    setStore: function (store, initial) {
        if (!initial && this.store) {
            this.store.un("datachanged", this.onDataChanged, this);
            this.store.un("add", this.onAdd, this);
            this.store.un("remove", this.onRemove, this);
            this.store.un("update", this.onUpdate, this);
            this.store.un("clear", this.refresh, this);
        }
        if (store) {
            store.on("datachanged", this.onDataChanged, this);
            store.on("add", this.onAdd, this);
            store.on("remove", this.onRemove, this);
            store.on("update", this.onUpdate, this);
            store.on("clear", this.refresh, this);
        }
        this.store = store;
        if (store && store.getCount() > 0) {
            this.refresh();
        }
    },

    getEventRecord: function (id) {
        var idx = this.store.find(Ext.calendar.data.EventMappings.EventId.name, id);
        return this.store.getAt(idx);
    },

    getEventRecordFromEl: function (el) {
        return this.getEventRecord(this.getEventIdFromEl(el));
    },

    // private
    getParams: function () {
        return {
            viewStart: this.viewStart,
            viewEnd: this.viewEnd,
            startDate: this.startDate,
            dayCount: this.dayCount,
            weekCount: this.weekCount,
            title: this.getTitle()
        };
    },

    getTitle: function () {
        return Ext.Date.format(this.startDate, 'F Y');
    },


    onClick: function (e, t) {
        var el = e.getTarget(this.eventSelector, 5);
        if (el) {
            var id = this.getEventIdFromEl(el);
            this.fireEvent('eventclick', this, this.getEventRecord(id), el);
            return true;
        }
    },

    // private
    onMouseOver: function (e, t) {
        if (this.trackMouseOver !== false && (this.dragZone == undefined || !this.dragZone.dragging)) {
            if (!this.handleEventMouseEvent(e, t, 'over')) {
                this.handleDayMouseEvent(e, t, 'over');
            }
        }
    },

    // private
    onMouseOut: function (e, t) {
        if (this.trackMouseOver !== false && (this.dragZone == undefined || !this.dragZone.dragging)) {
            if (!this.handleEventMouseEvent(e, t, 'out')) {
                this.handleDayMouseEvent(e, t, 'out');
            }
        }
    },

    // private
    handleEventMouseEvent: function (e, t, type) {
        var el = e.getTarget(this.eventSelector, 5, true),
            rel,
            els,
            evtId;
        if (el) {
            rel = Ext.get(e.getRelatedTarget());
            if (el == rel || el.contains(rel)) {
                return true;
            }

            evtId = this.getEventIdFromEl(el);

            if (this.eventOverClass) {
                els = this.getEventEls(evtId);
                els[type == 'over' ? 'addCls' : 'removeCls'](this.eventOverClass);
            }
            this.fireEvent('event' + type, this, this.getEventRecord(evtId), el);
            return true;
        }
        return false;
    },

    // private
    getDateFromId: function (id, delim) {
        var parts = id.split(delim);
        return parts[parts.length - 1];
    },

    // private
    handleDayMouseEvent: function (e, t, type) {
        t = e.getTarget('td', 3);
        if (t) {
            if (t.id && t.id.indexOf(this.dayElIdDelimiter) > -1) {
                var dt = this.getDateFromId(t.id, this.dayElIdDelimiter),
                    rel = Ext.get(e.getRelatedTarget()),
                    relTD,
                    relDate;

                if (rel) {
                    relTD = rel.is('td') ? rel : rel.up('td', 3);
                    relDate = relTD && relTD.id ? this.getDateFromId(relTD.id, this.dayElIdDelimiter) : '';
                }
                if (!rel || dt != relDate) {
                    var el = this.getDayEl(dt);
                    if (el && this.dayOverClass != '') {
                        el[type == 'over' ? 'addCls' : 'removeCls'](this.dayOverClass);
                    }
                    this.fireEvent('day' + type, this, Ext.Date.parseDate(dt, "Ymd"), el);
                }
            }
        }
    },

    // private
    renderItems: function () {
        throw 'This method must be implemented by a subclass';
    },

    // private
    destroy: function () {
        this.callParent(arguments);

        if (this.el) {
            this.el.un('contextmenu', this.onContextMenu, this);
        }
        Ext.destroy(
            this.editWin,
            this.eventMenu,
            this.dragZone,
            this.dropZone
        );
    },

    isEventSpanning: function (evt) {
        var M = Ext.calendar.data.EventMappings,
            data = evt.data || evt,
            diff;

        diff = Ext.calendar.util.Date.diffDays(data[M.StartDate.name], data[M.EndDate.name]);

        return diff > 0;
    }
});

Ext.define('Ext.calendar.view.MonthDayDetail', {
    extend: 'Ext.Component',
    alias: 'widget.monthdaydetailview',

    requires: [
        'Ext.XTemplate',
        'Ext.calendar.util.Date',
        'Ext.calendar.view.AbstractCalendar'
    ],

    afterRender: function () {
        this.tpl = this.getTemplate();

        this.callParent(arguments);

        this.el.on({
            click: this.view.onClick,
            mouseover: this.view.onMouseOver,
            mouseout: this.view.onMouseOut,
            scope: this.view
        });
    },

    getTemplate: function () {
        if (!this.tpl) {
            this.tpl = new Ext.XTemplate(
                '<div class="ext-cal-mdv x-unselectable">',
                '<table class="ext-cal-mvd-tbl" cellpadding="0" cellspacing="0">',
                '<tbody>',
                '<tpl for=".">',
                '<tr><td class="ext-cal-ev">{markup}</td></tr>',
                '</tpl>',
                '</tbody>',
                '</table>',
                '</div>'
            );
        }
        this.tpl.compile();
        return this.tpl;
    },

    update: function (dt) {
        this.date = dt;
        this.refresh();
    },

    refresh: function () {
        if (!this.rendered) {
            return;
        }
        var eventTpl = this.view.getEventTemplate(),

            templateData = [],

            evts = this.store.queryBy(function (rec) {
                var thisDt = Ext.Date.clearTime(this.date, true).valueOf(),
                    recStart = Ext.Date.clearTime(rec.data[Ext.calendar.data.EventMappings.StartDate.name], true).valueOf(),
                    startsOnDate = (thisDt == recStart),
                    spansDate = false;

                if (!startsOnDate) {
                    var recEnd = Ext.Date.clearTime(rec.data[Ext.calendar.data.EventMappings.EndDate.name], true).valueOf();
                    spansDate = recStart < thisDt && recEnd >= thisDt;
                }
                return startsOnDate || spansDate;
            },
                this);

        evts.each(function (evt) {
            var item = evt.data,
                M = Ext.calendar.data.EventMappings;

            item._renderAsAllDay = item[M.IsAllDay.name] || Ext.calendar.util.Date.diffDays(item[M.StartDate.name], item[M.EndDate.name]) > 0;
            item.spanLeft = Ext.calendar.util.Date.diffDays(item[M.StartDate.name], this.date) > 0;
            item.spanRight = Ext.calendar.util.Date.diffDays(this.date, item[M.EndDate.name]) > 0;
            item.spanCls = (item.spanLeft ? (item.spanRight ? 'ext-cal-ev-spanboth' :
                'ext-cal-ev-spanleft') : (item.spanRight ? 'ext-cal-ev-spanright' : ''));

            templateData.push({
                markup: eventTpl.apply(this.getTemplateEventData(item))
            });
        },
            this);

        this.tpl.overwrite(this.el, templateData);
        this.fireEvent('eventsrendered', this, this.date, evts.getCount());
    },

    getTemplateEventData: function (evt) {
        var data = this.view.getTemplateEventData(evt);
        data._elId = 'dtl-' + data._elId;
        return data;
    }
});


Ext.define('Ext.calendar.view.Month', {
    extend: 'Ext.calendar.view.AbstractCalendar',
    alias: 'widget.monthview',

    requires: [
        'Ext.XTemplate',
        'Ext.calendar.template.Month',
        'Ext.calendar.util.WeekEventRenderer',
        'Ext.calendar.view.MonthDayDetail'
    ],


    showTime: true,

    showTodayText: true,

    todayText: 'امروز',

    showHeader: false,

    showWeekLinks: false,

    showWeekNumbers: false,

    weekLinkOverClass: 'ext-week-link-over',


    moreText: "+ {0} more...",

    //private properties -- do not override:
    daySelector: '.ext-cal-day',
    moreSelector: '.ext-cal-ev-more',
    weekLinkSelector: '.ext-cal-week-link',
    weekCount: -1,
    // defaults to auto by month
    dayCount: 7,
    moreElIdDelimiter: '-more-',
    weekLinkIdDelimiter: 'ext-cal-week-',

    // See EXTJSIV-11407.
    operaLT11: Ext.isOpera && (parseInt(Ext.operaVersion) < 11),





    // inherited docs
    //dayover: true,
    // inherited docs
    //dayout: true

    // private
    initDD: function () {
        var cfg = {
            view: this,
            createText: this.ddCreateEventText,
            moveText: this.ddMoveEventText,
            ddGroup: 'MonthViewDD'
        };

        this.dragZone = new Ext.calendar.dd.DragZone(this.el, cfg);
        this.dropZone = new Ext.calendar.dd.DropZone(this.el, cfg);
    },

    // private
    onDestroy: function () {
        Ext.destroy(this.ddSelector);
        Ext.destroy(this.dragZone);
        Ext.destroy(this.dropZone);

        this.callParent(arguments);
    },

    // private
    afterRender: function () {
        if (!this.tpl) {
            this.tpl = new Ext.calendar.template.Month({
                id: this.id,
                showTodayText: this.showTodayText,
                todayText: this.todayText,
                showTime: this.showTime,
                showHeader: this.showHeader,
                showWeekLinks: this.showWeekLinks,
                showWeekNumbers: this.showWeekNumbers
            });
        }
        this.tpl.compile();
        this.addCls('ext-cal-monthview ext-cal-ct');

        this.callParent(arguments);
    },

    // private
    onResize: function () {
        var me = this;
        me.callParent(arguments);
        me.maxEventsPerDay = me.getMaxEventsPerDay();
        if (me.monitorResize) {
            me.refresh();
        }
    },

    // private
    forceSize: function () {
        // Compensate for the week link gutter width if visible
        if (this.showWeekLinks && this.el) {
            var hd = this.el.down('.ext-cal-hd-days-tbl'),
                bgTbl = this.el.select('.ext-cal-bg-tbl'),
                evTbl = this.el.select('.ext-cal-evt-tbl'),
                wkLinkW = this.el.down('.ext-cal-week-link').getWidth(),
                w = this.el.getWidth() - wkLinkW;

            hd.setWidth(w);
            bgTbl.setWidth(w);
            evTbl.setWidth(w);
        }
        this.callParent(arguments);
    },

    //private
    initClock: function () {
        if (Ext.fly(this.id + '-clock') !== null) {
            this.prevClockDay = new Date().getDay();
            if (this.clockTask) {
                Ext.TaskManager.stop(this.clockTask);
            }
            this.clockTask = Ext.TaskManager.start({
                run: function () {
                    var el = Ext.fly(this.id + '-clock'),
                        t = new Date();

                    if (t.getDay() == this.prevClockDay) {
                        if (el) {
                            el.update(Ext.Date.format(t, 'g:i a'));
                        }
                    }
                    else {
                        this.prevClockDay = t.getDay();
                        this.moveTo(t);
                    }
                },
                scope: this,
                interval: 1000
            });
        }
    },

    // inherited docs
    getEventBodyMarkup: function () {
        if (!this.eventBodyMarkup) {
            this.eventBodyMarkup = ['{Title}',
                '<tpl if="_isReminder">',
                '<i class="ext-cal-ic ext-cal-ic-rem">&nbsp;</i>',
                '</tpl>',
                '<tpl if="_isRecurring">',
                '<i class="ext-cal-ic ext-cal-ic-rcr">&nbsp;</i>',
                '</tpl>',
                '<tpl if="spanLeft">',
                '<i class="ext-cal-spl">&nbsp;</i>',
                '</tpl>',
                '<tpl if="spanRight">',
                '<i class="ext-cal-spr">&nbsp;</i>',
                '</tpl>'
            ].join('');
        }
        return this.eventBodyMarkup;
    },

    // inherited docs
    getEventTemplate: function () {
        if (!this.eventTpl) {
            var tpl,
                body = this.getEventBodyMarkup();

            tpl = !((Ext.isIE && Ext.ieVersion < 10) || this.operaLT11) ?
                new Ext.XTemplate(
                    '<div id="{_elId}" class="{_selectorCls} {_colorCls} {spanCls} ext-cal-evt ext-cal-evr">',
                    body,
                    '</div>'
                )
                : new Ext.XTemplate(
                    '<tpl if="_renderAsAllDay">',
                    '<div id="{_elId}" class="{_selectorCls} {spanCls} {_colorCls} {_operaLT11} ext-cal-evt">',
                    '<div class="ext-cal-evm">',
                    '<div class="ext-cal-evi">',
                    '</tpl>',
                    '<tpl if="!_renderAsAllDay">',
                    '<div id="{_elId}" class="{_selectorCls} {_colorCls} {_operaLT11} ext-cal-evt ext-cal-evr">',
                    '</tpl>',
                    body,
                    '<tpl if="_renderAsAllDay">',
                    '</div>',
                    '</div>',
                    '</tpl>',
                    '</div>'
                );
            tpl.compile();
            this.eventTpl = tpl;
        }
        return this.eventTpl;
    },

    // private
    getTemplateEventData: function (evt) {
        var M = Ext.calendar.data.EventMappings,
            selector = this.getEventSelectorCls(evt[M.EventId.name]),
            title = evt[M.Title.name];

        return Ext.applyIf({
            _selectorCls: selector,
            _colorCls: 'ext-color-' + (evt[M.CalendarId.name] ?
                evt[M.CalendarId.name] : 'default') + (evt._renderAsAllDay ? '-ad' : ''),
            _elId: selector + '-' + evt._weekIndex,
            _isRecurring: evt.Recurrence && evt.Recurrence != '',
            _isReminder: evt[M.Reminder.name] && evt[M.Reminder.name] != '',
            Title: (evt[M.IsAllDay.name] ? '' : Ext.Date.format(evt[M.StartDate.name], 'g:ia ')) + (!title || title.length == 0 ? '(No title)' : title),
            _operaLT11: this.operaLT11 ? 'ext-operaLT11' : ''
        },
            evt);
    },

    // private
    refresh: function () {
        if (this.detailPanel) {
            this.detailPanel.hide();
        }
        this.callParent(arguments);

        if (this.showTime !== false) {
            this.initClock();
        }
    },

    // private
    renderItems: function () {
        Ext.calendar.util.WeekEventRenderer.render({
            eventGrid: this.allDayOnly ? this.allDayGrid : this.eventGrid,
            viewStart: this.viewStart,
            tpl: this.getEventTemplate(),
            maxEventsPerDay: this.getMaxEventsPerDay(),
            id: this.id,
            templateDataFn: Ext.bind(this.getTemplateEventData, this),
            evtMaxCount: this.evtMaxCount,
            weekCount: this.weekCount,
            dayCount: this.dayCount,
            moreText: this.moreText
        });
        this.fireEvent('eventsrendered', this);
    },

    // private
    getDayEl: function (dt) {
        return Ext.get(this.getDayId(dt));
    },

    // private
    getDayId: function (dt) {
        if (Ext.isDate(dt)) {
            dt = Ext.Date.format(dt, 'Ymd');
        }
        return this.id + this.dayElIdDelimiter + dt;
    },

    // private
    getWeekIndex: function (dt) {
        var el = this.getDayEl(dt).up('.ext-cal-wk-ct');
        return parseInt(el.id.split('-wk-')[1], 10);
    },

    // private
    getDaySize: function (contentOnly) {
        var box = this.el.getBox(),
            padding = this.getViewPadding(),
            w = (box.width - padding.width) / this.dayCount,
            h = (box.height - padding.height) / this.getWeekCount();

        if (contentOnly) {
            // measure last row instead of first in case text wraps in first row
            var hd = this.el.select('.ext-cal-dtitle').last().parent('tr');
            h = hd ? h - hd.getHeight(true) : h;
        }
        return { height: h, width: w };
    },

    // private
    getEventHeight: function () {
        if (!this.eventHeight) {
            var evt = this.el.select('.ext-cal-evt').first();
            if (evt) {
                this.eventHeight = evt.parent('td').getHeight();
            }
            else {
                return 16; // no events rendered, so try setting this.eventHeight again later
            }
        }
        return this.eventHeight;
    },

    // private
    getMaxEventsPerDay: function () {
        var dayHeight = this.getDaySize(true).height,
            eventHeight = this.getEventHeight(),
            max = Math.max(Math.floor((dayHeight - eventHeight) / eventHeight), 0);

        return max;
    },

    // private
    getViewPadding: function (sides) {
        var sides = sides || 'tlbr',
            top = sides.indexOf('t') > -1,
            left = sides.indexOf('l') > -1,
            right = sides.indexOf('r') > -1,
            height = this.showHeader && top ? this.el.select('.ext-cal-hd-days-tbl').first().getHeight() : 0,
            width = 0;

        if (this.isHeaderView) {
            if (left) {
                width = this.el.select('.ext-cal-gutter').first().getWidth();
            }
            if (right) {
                width += this.el.select('.ext-cal-gutter-rt').first().getWidth();
            }
        }
        else if (this.showWeekLinks && left) {
            width = this.el.select('.ext-cal-week-link').first().getWidth();
        }

        return {
            height: height,
            width: width
        }
    },

    // private
    getDayAt: function (x, y) {
        var box = this.el.getBox(),
            daySize = this.getDaySize(),
            dayL = Math.floor(((x - box.x) / daySize.width)),
            dayT = Math.floor(((y - box.y) / daySize.height)),
            days = (dayT * 7) + dayL,
            dt = Ext.calendar.util.Date.add(this.viewStart, { days: days });
        return {
            date: dt,
            el: this.getDayEl(dt)
        };
    },

    // inherited docs
    moveNext: function () {
        return this.moveMonths(1, undefined, true);
    },

    // inherited docs
    movePrev: function () {
        return this.moveMonths(- 1, undefined, true);
    },

    // private
    onInitDrag: function () {
        this.callParent(arguments);

        if (this.dayOverClass) {
            Ext.select(this.daySelector).removeCls(this.dayOverClass);
        }
        if (this.detailPanel) {
            this.detailPanel.hide();
        }
    },

    // private
    onMoreClick: function (dt) {
        if (!this.detailPanel) {
            this.detailPanel = Ext.create('Ext.Panel', {
                id: this.id + '-details-panel',
                title: Ext.Date.format(dt, 'F j'),
                layout: 'fit',
                floating: true,
                renderTo: Ext.getBody(),
                tools: [{
                    type: 'close',
                    handler: function (e, t, p) {
                        p.ownerCt.hide();
                    }
                }],
                items: {
                    xtype: 'monthdaydetailview',
                    id: this.id + '-details-view',
                    date: dt,
                    view: this,
                    store: this.store,
                    listeners: {
                        'eventsrendered': Ext.bind(this.onDetailViewUpdated, this)
                    }
                }
            });
        }
        else {
            this.detailPanel.setTitle(Ext.Date.format(dt, 'F j'));
        }
        this.detailPanel.getComponent(this.id + '-details-view').update(dt);
    },

    // private
    onDetailViewUpdated: function (view, dt, numEvents) {
        var p = this.detailPanel,
            dayEl = this.getDayEl(dt),
            box = dayEl.getBox();

        p.setWidth(Math.max(box.width, 220));
        p.show();
        p.getEl().alignTo(dayEl, 't-t?');
    },

    // private
    onHide: function () {
        this.callParent(arguments);

        if (this.detailPanel) {
            this.detailPanel.hide();
        }
    },

    // private
    onClick: function (e, t) {
        if (this.detailPanel) {
            this.detailPanel.hide();
        }
        if (Ext.calendar.view.Month.superclass.onClick.apply(this, arguments)) {
            // The superclass handled the click already so exit
            return;
        }
        if (this.dropZone) {
            this.dropZone.clearShims();
        }
        var el = e.getTarget(this.weekLinkSelector, 3),
            dt,
            parts;
        if (el) {
            dt = el.id.split(this.weekLinkIdDelimiter)[1];
            this.fireEvent('weekclick', this, Ext.Date.parseDate(dt, 'Ymd'));
            return;
        }
        el = e.getTarget(this.moreSelector, 3);
        if (el) {
            dt = el.id.split(this.moreElIdDelimiter)[1];
            this.onMoreClick(Ext.Date.parseDate(dt, 'Ymd'));
            return;
        }
        el = e.getTarget('td', 3);
        if (el) {
            if (el.id && el.id.indexOf(this.dayElIdDelimiter) > -1) {
                parts = el.id.split(this.dayElIdDelimiter);
                dt = parts[parts.length - 1];
                var date = new persianDate(dateToArray(numberToDate(dt)))
                this.fireEvent('dayclick', this, date, false, Ext.get(this.getDayId(dt)));
                return;
            }
        }
    },

    // private
    handleDayMouseEvent: function (e, t, type) {
        var el = e.getTarget(this.weekLinkSelector, 3, true);
        if (el && this.weekLinkOverClass) {
            el[type == 'over' ? 'addCls' : 'removeCls'](this.weekLinkOverClass);
            return;
        }
        this.callParent(arguments);
    }
});


Ext.define('Ext.calendar.view.DayHeader', {
    extend: 'Ext.calendar.view.Month',
    alias: 'widget.dayheaderview',

    requires: [
        'Ext.calendar.template.DayHeader'
    ],

    // private configs
    weekCount: 1,
    dayCount: 1,
    allDayOnly: true,
    monitorResize: false,



    // private
    afterRender: function () {
        if (!this.tpl) {
            this.tpl = new Ext.calendar.template.DayHeader({
                id: this.id,
                showTodayText: this.showTodayText,
                todayText: this.todayText,
                showTime: this.showTime
            });
        }
        this.tpl.compile();
        this.addCls('ext-cal-day-header');

        this.callParent(arguments);
    },

    // private
    forceSize: Ext.emptyFn,

    // private
    refresh: function () {
        this.callParent(arguments);
        this.recalcHeaderBox();
    },

    // private
    recalcHeaderBox: function () {
        var tbl = this.el.down('.ext-cal-evt-tbl'),
            h = tbl.getHeight();

        this.el.setHeight(h + 7);

        // These should be auto-height, but since that does not work reliably
        // across browser / doc type, we have to size them manually
        this.el.down('.ext-cal-hd-ad-inner').setHeight(h + 5);
        this.el.down('.ext-cal-bg-tbl').setHeight(h + 5);
    },

    // private
    moveNext: function (noRefresh) {
        return this.moveDays(this.dayCount, noRefresh, true);
    },

    // private
    movePrev: function (noRefresh) {
        return this.moveDays(- this.dayCount, noRefresh, true);
    },

    // private
    onClick: function (e, t) {
        var el = e.getTarget('td', 3),
            parts,
            dt;
        if (el) {
            if (el.id && el.id.indexOf(this.dayElIdDelimiter) > -1) {
                parts = el.id.split(this.dayElIdDelimiter);
                dt = parts[parts.length - 1];

                this.fireEvent('dayclick', this, Ext.Date.parseDate(dt, 'Ymd'), true, Ext.get(this.getDayId(dt)));
                return;
            }
        }
        this.callParent(arguments);
    }
});


Ext.define('Ext.calendar.view.DayBody', {
    extend: 'Ext.calendar.view.AbstractCalendar',
    alias: 'widget.daybodyview',

    requires: [
        'Ext.XTemplate',
        'Ext.calendar.template.DayBody',
        'Ext.calendar.data.EventMappings',
        'Ext.calendar.dd.DayDragZone',
        'Ext.calendar.dd.DayDropZone'
    ],

    //private
    dayColumnElIdDelimiter: '-day-col-',





    //private
    initDD: function () {
        var cfg = {
            createText: this.ddCreateEventText,
            moveText: this.ddMoveEventText,
            resizeText: this.ddResizeEventText
        };

        this.el.ddScrollConfig = {
            // scrolling is buggy in IE/Opera for some reason.  A larger vthresh
            // makes it at least functional if not perfect
            vthresh: Ext.isIE || Ext.isOpera ? 100 : 40,
            hthresh: -1,
            frequency: 50,
            increment: 100,
            ddGroup: 'DayViewDD'
        };
        this.dragZone = new Ext.calendar.dd.DayDragZone(this.el, Ext.apply({
            view: this,
            containerScroll: true
        },
            cfg));

        this.dropZone = new Ext.calendar.dd.DayDropZone(this.el, Ext.apply({
            view: this
        },
            cfg));
    },

    //private
    refresh: function () {
        var top = this.el.getScroll().top;
        this.prepareData();
        this.renderTemplate();
        this.renderItems();

        // skip this if the initial render scroll position has not yet been set.
        // necessary since IE/Opera must be deferred, so the first refresh will
        // override the initial position by default and always set it to 0.
        if (this.scrollReady) {
            this.scrollTo(top);
        }
    },


    scrollTo: function (y, defer) {
        defer = defer || (Ext.isIE || Ext.isOpera);
        if (defer) {
            Ext.defer(function () {
                this.el.scrollTo('top', y, true);
                this.scrollReady = true;
            }, 10, this);
        }
        else {
            this.el.scrollTo('top', y, true);
            this.scrollReady = true;
        }
    },

    // private
    afterRender: function () {
        if (!this.tpl) {
            this.tpl = new Ext.calendar.template.DayBody({
                id: this.id,
                dayCount: this.dayCount,
                showTodayText: this.showTodayText,
                todayText: this.todayText,
                showTime: this.showTime
            });
        }
        this.tpl.compile();

        this.addCls('ext-cal-body-ct');

        this.callParent(arguments);

        // default scroll position to 7am:
        this.scrollTo(7 * 42);
    },

    // private
    forceSize: Ext.emptyFn,

    // private
    onEventResize: function (rec, data) {
        var D = Ext.calendar.util.Date,
            start = Ext.calendar.data.EventMappings.StartDate.name,
            end = Ext.calendar.data.EventMappings.EndDate.name;

        if (D.compare(rec.data[start], data.StartDate) === 0 &&
            D.compare(rec.data[end], data.EndDate) === 0) {
            // no changes
            return;
        }
        rec.set(start, data.StartDate);
        rec.set(end, data.EndDate);

        this.fireEvent('eventresize', this, rec);
    },

    // inherited docs
    getEventBodyMarkup: function () {
        if (!this.eventBodyMarkup) {
            this.eventBodyMarkup = ['{Title}',
                '<tpl if="_isReminder">',
                '<i class="ext-cal-ic ext-cal-ic-rem">&nbsp;</i>',
                '</tpl>',
                '<tpl if="_isRecurring">',
                '<i class="ext-cal-ic ext-cal-ic-rcr">&nbsp;</i>',
                '</tpl>'
                //                '<tpl if="spanLeft">',
                //                    '<i class="ext-cal-spl">&nbsp;</i>',
                //                '</tpl>',
                //                '<tpl if="spanRight">',
                //                    '<i class="ext-cal-spr">&nbsp;</i>',
                //                '</tpl>'
            ].join('');
        }
        return this.eventBodyMarkup;
    },

    // inherited docs
    getEventTemplate: function () {
        if (!this.eventTpl) {
            this.eventTpl = !((Ext.isIE && Ext.ieVersion < 10) || Ext.isOpera) ?
                new Ext.XTemplate(
                    '<div id="{_elId}" class="{_selectorCls} {_colorCls} ext-cal-evt ext-cal-evr" style="left: {_left}%; width: {_width}%; top: {_top}px; height: {_height}px;">',
                    '<div class="ext-evt-bd">', this.getEventBodyMarkup(), '</div>',
                    '<div class="ext-evt-rsz"><div class="ext-evt-rsz-h">&nbsp;</div></div>',
                    '</div>'
                )
                : new Ext.XTemplate(
                    '<div id="{_elId}" class="ext-cal-evt {_selectorCls} {_colorCls}-x" style="left: {_left}%; width: {_width}%; top: {_top}px;">',
                    '<div class="ext-cal-evb">&nbsp;</div>',
                    '<dl style="height: {_height}px;" class="ext-cal-evdm">',
                    '<dd class="ext-evt-bd">',
                    this.getEventBodyMarkup(),
                    '</dd>',
                    '<div class="ext-evt-rsz"><div class="ext-evt-rsz-h">&nbsp;</div></div>',
                    '</dl>',
                    '<div class="ext-cal-evb">&nbsp;</div>',
                    '</div>'
                );
            this.eventTpl.compile();
        }
        return this.eventTpl;
    },


    getEventAllDayTemplate: function () {
        if (!this.eventAllDayTpl) {
            var tpl,
                body = this.getEventBodyMarkup();

            tpl = !((Ext.isIE && Ext.ieVersion < 10) || Ext.isOpera) ?
                new Ext.XTemplate(
                    '<div id="{_elId}" class="{_selectorCls} {_colorCls} {spanCls} ext-cal-evt ext-cal-evr" style="left: {_left}%; width: {_width}%; top: {_top}px; height: {_height}px;">',
                    body,
                    '</div>'
                )
                : new Ext.XTemplate(
                    '<div id="{_elId}" class="ext-cal-evt" style="left: {_left}%; width: {_width}%; top: {_top}px; height: {_height}px;">',
                    '<div class="{_selectorCls} {spanCls} {_colorCls} ext-cal-evt">',
                    '<div class="ext-cal-evm">',
                    '<div class="ext-cal-evi">',
                    body,
                    '</div>',
                    '</div>',
                    '</div></div>'
                );
            tpl.compile();
            this.eventAllDayTpl = tpl;
        }
        return this.eventAllDayTpl;
    },

    // private
    getTemplateEventData: function (evt) {
        var selector = this.getEventSelectorCls(evt[Ext.calendar.data.EventMappings.EventId.name]),
            data = {},
            M = Ext.calendar.data.EventMappings;

        this.getTemplateEventBox(evt);

        data._selectorCls = selector;
        data._colorCls = 'ext-color-' + (evt[M.CalendarId.name] || '0') + (evt._renderAsAllDay ? '-ad' : '');
        data._elId = selector + (evt._weekIndex ? '-' + evt._weekIndex : '');
        data._isRecurring = evt.Recurrence && evt.Recurrence != '';
        data._isReminder = evt[M.Reminder.name] && evt[M.Reminder.name] != '';
        var title = evt[M.Title.name];
        data.Title = (evt[M.IsAllDay.name] ? '' : Ext.Date.format(evt[M.StartDate.name], 'g:ia ')) + (!title || title.length == 0 ? '(No title)' : title);

        return Ext.applyIf(data, evt);
    },

    // private
    getTemplateEventBox: function (evt) {
        var heightFactor = 0.7,
            start = evt[Ext.calendar.data.EventMappings.StartDate.name],
            end = evt[Ext.calendar.data.EventMappings.EndDate.name],
            startMins = start.getHours() * 60 + start.getMinutes(),
            endMins = end.getHours() * 60 + end.getMinutes(),
            diffMins = endMins - startMins;

        evt._left = 0;
        evt._width = 100;
        evt._top = Math.round(startMins * heightFactor);
        evt._height = Math.max((diffMins * heightFactor), 15);
    },

    // private
    renderItems: function () {
        var day = 0,
            evts = [],
            ev,
            d,
            ct,
            item,
            i,
            j,
            l,
            emptyCells, skipped,
            evt,
            evt2,
            overlapCols,
            colWidth,
            evtWidth,
            markup,
            target,
            M = Ext.calendar.data.EventMappings,
            ad,
            span,
            renderAsAllDay,
            prevDt,
            dt;

        for (; day < this.dayCount; day++) {
            ev = emptyCells = skipped = 0;
            d = this.eventGrid[0][day];
            ct = d ? d.length : 0;

            for (; ev < ct; ev++) {
                evt = d[ev];
                if (!evt) {
                    continue;
                }

                item = evt.data || evt.event.data;
                ad = item[M.IsAllDay.name] === true;
                span = this.isEventSpanning(evt.event || evt);
                renderAsAllDay = ad || span;

                if (renderAsAllDay) {
                    // this event is already rendered in the header view
                    continue;
                }
                Ext.apply(item, {
                    cls: 'ext-cal-ev',
                    _positioned: true
                });
                evts.push({
                    data: this.getTemplateEventData(item),
                    date: Ext.calendar.util.Date.add(this.viewStart, { days: day })
                });
            }
        }

        // overlapping event pre-processing loop
        i = j = 0;
        overlapCols = [];
        l = evts.length;
        for (; i < l; i++) {
            evt = evts[i].data;
            evt2 = null;
            dt = evt[M.StartDate.name].getDate();

            for (j = 0; j < l; j++) {
                if (i == j) {
                    continue;
                }

                evt2 = evts[j].data;
                if (this.isOverlapping(evt, evt2)) {
                    evt._overlap = evt._overlap == undefined ? 1 : evt._overlap + 1;
                    if (i < j) {
                        if (evt._overcol === undefined) {
                            evt._overcol = 0;
                        }
                        evt2._overcol = evt._overcol + 1;
                        overlapCols[dt] = overlapCols[dt] ? Math.max(overlapCols[dt], evt2._overcol) : evt2._overcol;
                    }
                }
            }
        }

        // rendering loop
        for (i = 0; i < l; i++) {
            evt = evts[i].data;
            dt = evt[M.StartDate.name].getDate();

            if (evt._overlap !== undefined) {
                colWidth = 100 / (overlapCols[dt] + 1);
                evtWidth = 100 - (colWidth * evt._overlap);

                evt._width = colWidth;
                evt._left = colWidth * evt._overcol;
            }
            markup = this.getEventTemplate().apply(evt);
            target = this.id + '-day-col-' + Ext.Date.format(evts[i].date, 'Ymd');

            Ext.core.DomHelper.append(target, markup);
        }

        this.fireEvent('eventsrendered', this);
    },

    // private
    getDayEl: function (dt) {
        return Ext.get(this.getDayId(dt));
    },

    // private
    getDayId: function (dt) {
        if (Ext.isDate(dt)) {
            dt = Ext.Date.format(dt, 'Ymd');
        }
        return this.id + this.dayColumnElIdDelimiter + dt;
    },

    // private
    getDaySize: function () {
        var box = this.el.down('.ext-cal-day-col-inner').getBox();
        return {
            height: box.height,
            width: box.width
        };
    },

    // private
    getDayAt: function (x, y) {
        var xoffset = this.el.down('.ext-cal-day-times').getWidth(),
            viewBox = this.el.getBox(),
            daySize = this.getDaySize(false),
            relX = x - viewBox.x - xoffset,
            dayIndex = Math.floor(relX / daySize.width),
            // clicked col index
            scroll = this.el.getScroll(),
            row = this.el.down('.ext-cal-bg-row'),
            // first avail row, just to calc size
            rowH = row.getHeight() / 2,
            // 30 minute increment since a row is 60 minutes
            relY = y - viewBox.y - rowH + scroll.top,
            rowIndex = Math.max(0, Math.ceil(relY / rowH)),
            mins = rowIndex * 30,
            dt = Ext.calendar.util.Date.add(this.viewStart, { days: dayIndex, minutes: mins }),
            el = this.getDayEl(dt),
            timeX = x;

        if (el) {
            timeX = el.getX();
        }

        return {
            date: dt,
            el: el,
            // this is the box for the specific time block in the day that was clicked on:
            timeBox: {
                x: timeX,
                y: (rowIndex * 21) + viewBox.y - scroll.top,
                width: daySize.width,
                height: rowH
            }
        };
    },

    // private
    onClick: function (e, t) {
        if (this.dragPending || Ext.calendar.view.DayBody.superclass.onClick.apply(this, arguments)) {
            // The superclass handled the click already so exit
            return;
        }
        if (e.getTarget('.ext-cal-day-times', 3) !== null) {
            // ignore clicks on the times-of-day gutter
            return;
        }
        var el = e.getTarget('td', 3);
        if (el) {
            if (el.id && el.id.indexOf(this.dayElIdDelimiter) > -1) {
                var dt = this.getDateFromId(el.id, this.dayElIdDelimiter);
                this.fireEvent('dayclick', this, Ext.Date.parseDate(dt, 'Ymd'), true, Ext.get(this.getDayId(dt, true)));
                return;
            }
        }
        var day = this.getDayAt(e.getX(), e.getY());
        if (day && day.date) {
            this.fireEvent('dayclick', this, day.date, false, null);
        }
    }
});


Ext.define('Ext.calendar.view.Day', {
    extend: 'Ext.container.Container',
    alias: 'widget.dayview',

    requires: [
        'Ext.calendar.view.AbstractCalendar',
        'Ext.calendar.view.DayHeader',
        'Ext.calendar.view.DayBody'
    ],


    showTime: true,

    showTodayText: true,

    todayText: 'امروز',

    ddCreateEventText: 'Create event for {0}',

    ddMoveEventText: 'Move event to {0}',

    dayCount: 1,

    // private
    initComponent: function () {
        // rendering more than 7 days per view is not supported
        this.dayCount = this.dayCount > 7 ? 7 : this.dayCount;

        var cfg = Ext.apply({}, this.initialConfig);
        cfg.showTime = this.showTime;
        cfg.showTodatText = this.showTodayText;
        cfg.todayText = this.todayText;
        cfg.dayCount = this.dayCount;
        cfg.weekCount = 1;

        var header = Ext.applyIf({
            xtype: 'dayheaderview',
            id: this.id + '-hd'
        }, cfg);

        var body = Ext.applyIf({
            xtype: 'daybodyview',
            id: this.id + '-bd'
        }, cfg);

        this.items = [header, body];
        this.addCls('ext-cal-dayview ext-cal-ct');

        this.callParent(arguments);
    },

    // private
    afterRender: function () {
        this.callParent(arguments);

        this.header = Ext.getCmp(this.id + '-hd');
        this.body = Ext.getCmp(this.id + '-bd');
        this.body.on('eventsrendered', this.forceSize, this);
    },

    // private
    refresh: function () {
        this.header.refresh();
        this.body.refresh();
    },

    // private
    forceSize: function () {
        // The defer call is mainly for good ol' IE, but it doesn't hurt in
        // general to make sure that the window resize is good and done first
        // so that we can properly calculate sizes.
        Ext.defer(function () {
            var ct = this.el.up('.x-panel-body'),
                hd = this.el.down('.ext-cal-day-header'),
                h = ct.getHeight() - hd.getHeight();

            this.el.down('.ext-cal-body-ct').setHeight(h);
        }, 10, this);
    },

    // private
    onResize: function () {
        this.callParent(arguments);
        this.forceSize();
    },

    // private
    getViewBounds: function () {
        return this.header.getViewBounds();
    },


    getStartDate: function () {
        return this.header.getStartDate();
    },


    setStartDate: function (dt) {
        this.header.setStartDate(dt, true, true);
        this.body.setStartDate(dt, true, false);
    },

    // private
    renderItems: function () {
        this.header.renderItems();
        this.body.renderItems();
    },


    isToday: function () {
        return this.header.isToday();
    },


    moveTo: function (dt, noRefresh) {
        this.header.moveTo(dt, noRefresh, true);
        return this.body.moveTo(dt, noRefresh);
    },


    moveNext: function (noRefresh) {
        this.header.moveNext(noRefresh, true);
        return this.body.moveNext(noRefresh);
    },


    movePrev: function (noRefresh) {
        this.header.movePrev(noRefresh, true);
        return this.body.movePrev(noRefresh);
    },


    moveDays: function (value, noRefresh) {
        this.header.moveDays(value, noRefresh, true);
        return this.body.moveDays(value, noRefresh);
    },


    moveToday: function (noRefresh) {
        this.header.moveToday(noRefresh, true);
        return this.body.moveToday(noRefresh);
    }
});


Ext.define('Ext.calendar.view.Week', {
    extend: 'Ext.calendar.view.Day',
    alias: 'widget.weekview',


    dayCount: 7
});


Ext.define('Ext.calendar.CalendarPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.calendarpanel',

    requires: [
        'Ext.layout.container.Card'/*,
        'Ext.calendar.view.Day',
        'Ext.calendar.view.Week'*/,
        'Ext.calendar.view.Month',
        'Ext.calendar.form.EventDetails',
        'Ext.calendar.data.EventMappings'
    ],


    showDayView: false,

    showWeekView: false,

    showMonthView: true,

    showNavBar: true,

    todayText: 'امروز',

    showTodayText: true,

    showTime: true,

    dayText: 'روز',

    weekText: 'هفته',

    monthText: 'ماه',

    layout: 'card',

    // private property
    startDate: new persianDate(),


    rtl: true,
    shiftID: 0,
    //
    // NOTE: CalendarPanel also relays the following events from contained views as if they originated from this:
    //
    // private
    initComponent: function () {
        this.tbar = {
            cls: 'ext-cal-toolbar',
            border: true,
            items: ['->', {
                id: this.id + '-tb-prev',
                handler: this.onPrevClick,
                scope: this,
                iconCls: 'x-tbar-page-prev'
            }]
        };

        if (this.eventStore) {
            this.eventStore = Ext.data.StoreManager.lookup(this.eventStore);
        }

        if (this.calendarStore) {
            this.calendarStore = Ext.data.StoreManager.lookup(this.calendarStore);
        }

        this.viewCount = 0;

        if (this.showDayView) {
            this.tbar.items.push({
                id: this.id + '-tb-day',
                text: this.dayText,
                handler: this.onDayClick,
                scope: this,
                toggleGroup: 'tb-views'
            });
            this.viewCount++;
        }
        if (this.showWeekView) {
            this.tbar.items.push({
                id: this.id + '-tb-week',
                text: this.weekText,
                handler: this.onWeekClick,
                scope: this,
                toggleGroup: 'tb-views'
            });
            this.viewCount++;
        }
        if (this.showMonthView || this.viewCount == 0) {
            this.tbar.items.push(/*{
                id: this.id + '-tb-month',
                text: this.monthText,
                handler: this.onMonthClick,
                scope: this,
                toggleGroup: 'tb-views'
            }*/

                {
                    xtype: "combobox",
                    id: "calendarYear",
                    fieldLabel: "سال",
                    editable: false,
                    labelWidth: 30,
                    width: 100,
                    store: getYears(),
                    listeners: {
                        afterrender: {
                            fn: function (item) {
                                this.select(getYear(true));
                                //this.fireEvent('select', this, this.store.data.items[0]);
                            }
                        },
                        select: {
                            fn: function (item, newValue, oldValue) {
                                var me = this.up().up()
                                var date = new persianDate([parseInt(newValue[0].data.field1), parseInt(this.next('combobox').value), 1])
                                me.setStartDate(date)
                                getEventShiftCalendar(me, me.shiftID, date.intDate)
                            }
                        }
                    }
                });
            this.tbar.items.push({
                xtype: "combobox",
                id: "calendarMonth",
                fieldLabel: "ماه",
                editable: false,
                labelWidth: 30,
                width: 130,
                store: getMonths(),
                listeners: {
                    afterrender: {
                        fn: function (item) {
                            this.select(getMonth(true));
                            //this.fireEvent('select', this, this.store.data.items[0]);
                        }
                    },
                    select: {
                        fn: function (item, newValue, oldValue) {

                            var me = this.up().up()
                            var date = new persianDate([parseInt(this.prev('combobox').value), parseInt(newValue[0].data.field1), 1])
                            me.setStartDate(date)
                            getEventShiftCalendar(me, me.shiftID, date.intDate)

                        }
                    }
                }
            });
            this.viewCount++;
            this.showMonthView = true;
        }
        this.tbar.items.push({
            id: this.id + '-tb-next',
            handler: this.onNextClick,
            scope: this,
            iconCls: 'x-tbar-page-next'
        });
        this.tbar.items.push('->');

        var idx = this.viewCount - 1;
        this.activeItem = this.activeItem === undefined ? idx : (this.activeItem > idx ? idx : this.activeItem);

        if (this.showNavBar === false) {
            delete this.tbar;
            this.addCls('x-calendar-nonav');
        }

        this.callParent();

        // do not allow override
        if (this.showDayView) {
            var day = Ext.apply({
                xtype: 'dayview',
                title: this.dayText,
                showToday: this.showToday,
                showTodayText: this.showTodayText,
                showTime: this.showTime
            },
                this.dayViewCfg);

            day.id = this.id + '-day';
            day.store = day.store || this.eventStore;
            this.initEventRelay(day);
            this.add(day);
        }
        if (this.showWeekView) {
            var wk = Ext.applyIf({
                xtype: 'weekview',
                title: this.weekText,
                showToday: this.showToday,
                showTodayText: this.showTodayText,
                showTime: this.showTime
            },
                this.weekViewCfg);

            wk.id = this.id + '-week';
            wk.store = wk.store || this.eventStore;
            this.initEventRelay(wk);
            this.add(wk);
        }
        if (this.showMonthView) {
            var month = Ext.applyIf({
                xtype: 'monthview',
                title: this.monthText,
                showToday: this.showToday,
                showTodayText: this.showTodayText,
                showTime: this.showTime
            },
                this.monthViewCfg);

            Ext.applyIf(month.listeners, {
                'weekclick': {
                    fn: function (vw, dt) {
                        this.showWeek(dt);
                    },
                    scope: this
                }
            });

            month.id = this.id + '-month';
            month.store = month.store || this.eventStore;
            this.initEventRelay(month);
            this.add(month);
        }

        this.on("afterlayout", function () {
            var view = this.layout.getActiveItem();
            view.setStartDate(view.startDate || new Date(), false, true);
        }, this, { single: true });

        this.add(Ext.applyIf({
            xtype: 'eventeditform',
            id: this.id + '-edit',
            calendarStore: this.calendarStore,
            listeners: {
                'eventadd': {
                    scope: this,
                    fn: this.onEventAdd
                },
                'eventupdate': {
                    scope: this,
                    fn: this.onEventUpdate
                },
                'eventdelete': {
                    scope: this,
                    fn: this.onEventDelete
                },
                'eventcancel': {
                    scope: this,
                    fn: this.onEventCancel
                }
            }
        },
            this.editViewCfg));
    },

    // private
    initEventRelay: function (cfg) {
        cfg.listeners = cfg.listeners || {};
        cfg.listeners.afterrender = {
            fn: function (c) {
                // relay the view events so that app code only has to handle them in one place
                this.relayEvents(c, ['eventsrendered', 'eventclick', 'eventover', 'eventout', 'dayclick',
                    'eventmove', 'datechange', 'rangeselect', 'eventdelete', 'eventresize', 'initdrag']);
            },
            scope: this,
            single: true
        };
    },

    // private
    afterRender: function () {
        this.callParent(arguments);

        this.body.addCls('x-cal-body');

        Ext.defer(function () {
            this.updateNavState();
            this.fireViewChange();
        }, 10, this);
    },

    // private
    onLayout: function () {
        this.callParent();
        if (!this.navInitComplete) {
            this.updateNavState();
            this.navInitComplete = true;
        }
    },

    // private
    onEventAdd: function (form, rec) {
        rec.data[Ext.calendar.data.EventMappings.IsNew.name] = false;
        this.hideEditForm();
        this.eventStore.add(rec);
        this.eventStore.sync();
        this.fireEvent('eventadd', this, rec);
    },

    // private
    onEventUpdate: function (form, rec) {
        this.hideEditForm();
        rec.commit();
        this.eventStore.sync();
        this.fireEvent('eventupdate', this, rec);
    },

    // private
    onEventDelete: function (form, rec) {
        this.hideEditForm();
        this.eventStore.remove(rec);
        this.eventStore.sync();
        this.fireEvent('eventdelete', this, rec);
    },

    // private
    onEventCancel: function (form, rec) {
        this.hideEditForm();
        this.fireEvent('eventcancel', this, rec);
    },


    showEditForm: function (rec) {
        this.preEditView = this.layout.getActiveItem().id;
        this.setActiveView(this.id + '-edit');
        this.layout.getActiveItem().loadRecord(rec);
        return this;
    },


    hideEditForm: function () {
        if (this.preEditView) {
            this.setActiveView(this.preEditView);
            delete this.preEditView;
        }
        return this;
    },

    // private
    setActiveView: function (id) {
        var l = this.layout,
            tb = this.getDockedItems('toolbar')[0];

        // show/hide the toolbar first so that the layout will calculate the correct item size
        if (tb) {
            tb[id === this.id + '-edit' ? 'hide' : 'show']();
        }

        Ext.suspendLayouts();

        l.setActiveItem(id);
        this.activeView = l.getActiveItem();

        if (id !== this.id + '-edit') {
            if (id !== this.preEditView) {
                l.activeItem.setStartDate(this.startDate, true, true);
            }
            this.updateNavState();
        }
        Ext.resumeLayouts(true);

        this.fireViewChange();
    },

    // private
    fireViewChange: function () {
        if (this.layout && this.layout.getActiveItem) {
            var view = this.layout.getActiveItem();
            if (view && view.getViewBounds) {
                var vb = view.getViewBounds();
                var info = {
                    activeDate: view.getStartDate(),
                    viewStart: vb.start,
                    viewEnd: vb.end
                };
            }
            this.fireEvent('viewchange', this, view, info);
        }
    },

    // private
    updateNavState: function () {
        if (this.showNavBar !== false) {
            var item = this.layout.activeItem,
                suffix = item.id.split(this.id + '-')[1],
                btn = Ext.getCmp(this.id + '-tb-' + suffix);

            if (btn) {
                btn.toggle(true);
            }
        }
    },


    setStartDate: function (dt) {
        this.layout.activeItem.setStartDate(dt, true);
        this.updateNavState();
        this.fireViewChange();
    },

    // private
    showWeek: function (dt) {
        this.setActiveView(this.id + '-week');
        this.setStartDate(dt);
    },

    // private
    onPrevClick: function () {
        this.startDate = this.layout.activeItem.movePrev();
        this.updateNavState();
        this.fireViewChange();

        this.down('#calendarYear').setValue(this.startDate.year().toString())
        this.down('#calendarMonth').setValue(farsiToEnglish(this.startDate.format('MM')))

        getEventShiftCalendar(this, this.shiftID, this.startDate.intDate)
    },

    // private
    onNextClick: function () {
        this.startDate = this.layout.activeItem.moveNext();
        this.updateNavState();
        this.fireViewChange();
        //this.startDate.toLocale('en');
        this.down('#calendarYear').setValue(this.startDate.year().toString())
        this.down('#calendarMonth').setValue(farsiToEnglish(this.startDate.format('MM')))

        getEventShiftCalendar(this, this.shiftID,  this.startDate.intDate)
    },

    // private
    onDayClick: function () {
        this.setActiveView(this.id + '-day');
    },

    // private
    onWeekClick: function () {
        this.setActiveView(this.id + '-week');
    },

    // private
    onMonthClick: function () {
        this.setActiveView(this.id + '-month');
    },


    getActiveView: function () {
        return this.layout.activeItem;
    }
});

//-------------------------------------------------------------------------------------------------------------------------------
Ext.iterate(Ext.calendar.data.EventMappings, function (key, value) {
    if (value) {
        value.mapping = null;
    }
});
Ext.apply(Ext.calendar.data.EventMappings.StartDate, {
    name: "StartDate",
    type: "date",
    dateFormat: "MS"
});
Ext.apply(Ext.calendar.data.EventMappings.EndDate, {
    name: "EndDate",
    type: "date",
    dateFormat: "MS"
});

function CalendarPanel(calendar, eventWin) {


    this.calendarPanel = calendar,
        this.eventWindow = eventWin,

        this.getCalendar = function () {
            return this.calendarPanel;
        },

        this.getStore = function () {
            return this.calendarPanel.eventStore;
        },

        this.getWindow = function () {

            return this.eventWindow;
        },

        this.viewChange = function (p, vw, dateInfo) {
            var win = this.getWindow();

            if (win) {
                win.hide();
            }

            if (dateInfo) {
                // will be null when switching to the event edit form, so ignore
                //this.DatePicker1.setValue(dateInfo.activeDate);
                this.updateTitle(dateInfo.viewStart, dateInfo.viewEnd);
            }
        },

        this.updateTitle = function (startDt, endDt) {
            var msg = '',
                fmt = new persianDate().format;

            if (startDt.valueOf() == endDt.valueOf()) {
                msg = startDt.format('LL');
            } else if (startDt.year() == endDt.year()) {
                if (startDt.month() == endDt.month()) {
                    msg = startDt.format('LL') + ' - ' + endDt.format('LL');
                } else {
                    msg = startDt.format('LL') + ' - ' + endDt.format('LL');
                }
            } else {
                msg = msg = startDt.format('LL') + ' - ' + endDt.format('LL');
            }

            // this.Panel1.setTitle(msg);
        },

        this.setStartDate = function (picker, date) {
            this.getCalendar().setStartDate(date);
        },

        this.rangeSelect = function (cal, dates, callback) {
            this.record.show(cal, dates);
            this.getWindow().on('hide', callback, cal, { single: true });
        },
        this.dayClick = function (cal, dt, allDay, el) {
            this.record.show.call(this, cal, {
                StartDate: dt,
                IsAllDay: allDay
            }, el);
        },

        this.record = {
            addFromEventDetailsForm: function (win, rec) {
                this.ShowMsg('Event ' + rec.data.Title + ' was added');
            },

            add: function (win, rec) {
                win.hide();
                this.getStore().add(rec);
                this.getStore().sync();
                this.ShowMsg('Event ' + rec.data.Title + ' was added');
            },

            updateFromEventDetailsForm: function (win, rec) {
                this.ShowMsg('Event ' + rec.data.Title + ' was updated');
            },

            update: function (win, rec) {
                win.hide();
                rec.commit();
                this.getStore().sync();
                this.ShowMsg('Event ' + rec.data.Title + ' was updated');
            },

            removeFromEventDetailsForm: function (win, rec) {
                this.ShowMsg('Event ' + rec.data.Title + ' was deleted');
            },

            remove: function (win, rec) {
                this.getStore().remove(rec);
                this.getStore().sync();
                win.hide();
                this.ShowMsg('Event ' + rec.data.Title + ' was deleted');
            },

            edit: function (win, rec) {
                win.hide();
                rec.commit();
                this.getCalendar().showEditForm(rec);
            },

            resize: function (cal, rec) {
                rec.commit();
                this.ShowMsg('Event ' + rec.data.Title + ' was updated');
            },

            move: function (cal, rec) {
                rec.commit();
                this.ShowMsg('Event ' + rec.data.Title + ' was moved to ' + Ext.Date.format(rec.data.StartDate, 'F jS' + (rec.data.IsAllDay ? '' : ' \\a\\t g:i a')));
            },

            show: function (cal, rec, el) {
                this.getWindow().show(rec, el);
            },

            saveAll: function () {
                this.getStore().submitData({
                    mappings: false
                });
            }
        }
};


function createShiftCalendar(parent, shiftID, calendarId, isPrivateCalendar, afterrenderFn) {

    var calendarActions = new CalendarPanel(null, null)

    var calendarStore = Ext.create("Ext.calendar.data.MemoryCalendarStore", {

        "autoMsg": false,
        autoLoad: true,
        proxy: {

            type: 'memory'
        },

    })

    

    var eventStore = Ext.create("Ext.calendar.data.MemoryEventStore", {
        storeId: "EventStore1",
        autoLoad: true,
        //proxy: {
        //    data: [{
        //        "id": 1001,
        //        "cid": 8,
        //        "Title": "Vacation",
        //        "StartDate": "1397/06/01",
        //        "EndDate": "1397/06/04"
        //    }, {
        //        "id": 1002,
        //        "cid": 6,
        //        "Title": "Lunch with Matt",
        //        "StartDate": "1397/06/03",
        //        "EndDate": "1397/06/04"
        //    }],
        //    type: 'memory'
        //},
        listeners: {
            beforesync: {
                fn: function (options) {
                    Ext.Msg.alert('Sync', 'The EventStore initiates a sync request after that action. The EventStore synchronization is not implemented in that example.');
                    this.commitChanges();
                    return false;
                }
            }

        }
    })


    

    var calendarPanel = Ext.create("Ext.calendar.CalendarPanel", {
        id: calendarId,
        border: false,
        renderTo: parent,
        height: 700,
        //width: 1000,
        region: "center",
        activeItem: 2,
        title: "تقویم",
        iconCls: "#Calendar",
        shiftID: shiftID,

        calendarStore: calendarStore,

        eventStore: eventStore,
        //dayViewCfg: {
        //    "enableFx": false,
        //    xtype: "dayview"
        //},
        //weekViewCfg: {
        //    "enableFx": false,
        //    xtype: "weekview"
        //},
        monthViewCfg: {
            xtype: "monthview",
            enableFx: false,
            showHeader: true,
            showWeekLinks: true,
            showWeekNumbers: true
        },
        listeners: {
            dayclick: {
              
                fn: function (cal, dt, allDay, el) {
                    
                    eventWindow.show({
                        StartDate: dt,
                        IsAllDay: allDay
                    }, el)
                }

            },
            eventadd: {
                scope: calendarActions,
                fn: calendarActions.record.addFromEventDetailsForm
            },
            eventclick: {
                scope: calendarActions,
                fn: function (cal, rec, el) {

                    var form = eventWindow.down('form')
                    form.down('textfield').setValue(rec.data.Title)
                    form.down('daterangefield').items.items[0].setValue(rec.data.StartDate.dayDate)
                    form.down('daterangefield').items.items[1].setValue(rec.data.EndDate.dayDate)
                    form.down('calendarpicker').setValue(rec.data.CodeID)
                    form.down('#rbg_IsVacation').setValue({ value: rec.data.IsVacation })
                    eventWindow.show(rec, el)//(rec, el);
                }
            },
            eventdelete: {
                scope: calendarActions,
                fn: calendarActions.record.removeFromEventDetailsForm
            },
            eventmove: {
                scope: calendarActions,
                fn: calendarActions.record.move
            },
            eventresize: {
                scope: calendarActions,
                fn: calendarActions.record.resize
            },
            eventupdate: {
                scope: calendarActions,
                fn: calendarActions.record.updateFromEventDetailsForm
            },
            rangeselect: {
                scope: calendarActions,
                fn: calendarActions.rangeSelect
            },
            viewchange: {
                scope: calendarActions,
                fn: calendarActions.viewChange
            },

            afterrender: {
                fn: fillStores
            }
        }
    });

    function fillStores(calendarPanel) {

        getPresenceCodeTitle(calendarPanel)

        getEventShiftCalendar(calendarPanel, shiftID, (new persianDate()).intDate)
    }

    var eventWindow = Ext.create("Ext.calendar.form.EventWindow", {
        //id: "EventWindow1",
        hidden: true,
        renderTo: parent,
        hidden: true,
        calendarStore: calendarStore,
        listeners: {
            eventadd: {
                //scope: calendarActions,
                fn: function (win, rec) {

                    
                    var startDate = rec.data.StartDate
                    var endDate = rec.data.EndDate
                    var data = {
                        CompanyID: companyID,
                        StartDate: rec.data.StartDate.intDate,
                        EndDate: rec.data.EndDate.intDate,
                        ShiftID: shiftID,
                        CodeID: rec.data.CodeID,
                        IsVacation: rec.data.IsVacation
                    }

                    if (data.StartDate > data.EndDate) {

                        showMsgInfo('تاریخ پایان نمیتواند کوچکتر از تاریخ شروع باشد', 'خطا', 'danger', false, true)
                        return
                    }
                    //if (isNullOrEmpty(data.CodeID)) {

                    //    showMsgInfo('تاریخ پایان نمیتواند کوچکتر از تاریخ شروع باشد', 'خطا', 'danger', false, true)
                    //    return
                    //}

                    if (isPrivateCalendar == false) {

                        //(spName, isID, isResult, fillControl, extraData, mask, isTitle, afterInsertFn, msgConfig)
                        execSPInsert('X7fR0G60+O6UePbV+RsHtdwYZl8VdBDj'/*SPA_ShiftCalendarUpdate*/, false, false, null,
                            data, win, false, function () {

                                win.hide();
                                getEventShiftCalendar(calendarPanel, shiftID, data.StartDate)
                                //calendarPanel.eventStore.add(rec);
                                //calendarPanel.eventStore.sync();
                            })

                    }
                        //saveShiftCalendar(data, ctrl)

                   
                   // this.ShowMsg('Event ' + rec.data.Title + ' was added');
                }//calendarActions.record.add
            },
            eventdelete: {
                scope: calendarActions,
                fn: calendarActions.record.remove
            },
            eventupdate: {
                scope: calendarActions,
                fn: calendarActions.record.update
            },
            editdetails: {
                scope: calendarActions,
                fn: calendarActions.record.edit
            }
        }
    });


    calendarActions.calendarPanel = calendarPanel
    calendarActions.eventWindow = eventWindow

    return calendarPanel;
}

