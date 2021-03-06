// @flow
import { Range } from 'immutable';
import { Block } from 'slate';

import type Options from '../options';

import createRow from './createRow';
import createAlign from './createAlign';
import createWidths from './createWidths';
import getAdjustedRow from '../helpers/getAdjustedRow';

/**
 * Create a table
 */
function createTable(
    opts: Options,
    columns: number,
    rows: number,
    textGetter?: (row: number, column: number) => string,
    widths?: Array<number>
): Block {
    const presetAlign = createAlign(columns);
    widths = widths || createWidths(columns);
    const rowNodes = Range(0, rows)
        .map(i =>
            createRow(
                opts,
                columns,
                textGetter ? textGetter.bind(null, i) : undefined
            )
        )
        .toList()
        .map(row => getAdjustedRow(row, presetAlign));

    return Block.create({
        type: opts.typeTable,
        nodes: rowNodes,
        data: {
            presetAlign,
            widths
        }
    });
}

export default createTable;
