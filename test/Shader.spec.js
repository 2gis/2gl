import GlContext from './utils/GlContext';
import assert from 'assert';
import sinon from 'sinon';

import Shader from '../src/Shader';

describe('Shader', () => {
    it('should process shader as string', () => {
        const s = new Shader('vertex', 'foo');
        assert.equal(s._code, 'foo');
    });

    it('should process shader as lines', () => {
        const lines = ['foo', 'bar'];
        const s = new Shader('vertex', lines);
        assert.equal(s._code, lines.join('\n'));
    });

    it('should assign Shader.Vertex type for vertex shader', () => {
        const s = new Shader('vertex', 'foo');
        assert.equal(s.type, Shader.Vertex);
    });

    it('should assign Shader.Fragment type for vertex shader', () => {
        const s = new Shader('fragment', 'foo');
        assert.equal(s.type, Shader.Fragment);
    });

    it('error shader type becomes fragment', () => {
        const s = new Shader('quux', 'foo');
        assert.equal(s.type, Shader.Fragment);
    });

    it('should prepend definitions before shader', () => {
        const s = new Shader('vertex', 'foo', [{ type: 'bar' }]);
        assert.equal(s._code, ['#define bar', 'foo'].join('\n'));
    });

    it('should keep #version at first line', () => {
        const s = new Shader('vertex', ['#version es 300', 'foo'], [{ type: 'bar' }]);
        assert.equal(s._code, ['#version es 300', '#define bar', 'foo'].join('\n'));
    });
});
